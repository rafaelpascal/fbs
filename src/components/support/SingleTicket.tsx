import { useState, useRef, useEffect } from "react";
import { IoDocumentAttach, IoSend } from "react-icons/io5";
import { motion } from "framer-motion";
import { Avatar } from "../dashboard/Avatar";
import { MdCancel } from "react-icons/md";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";
import { CourseServices } from "~/api/course";
import useToast from "~/hooks/useToast";
import { LoadingSpinner } from "../ui/loading-spinner";
import { AuthService } from "~/api/auth";

const SingleTicket = ({ id }: { id: string }) => {
  const { theme } = useTheme();
  const { error } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [supportid, setsupportid] = useState(32);
  const Storeduser = AuthService.getSession();
  const [messages, setMessages] = useState([
    {
      sender: "user",
      text: "",
      timestamp: new Date().toLocaleString(),
    },
    {
      sender: "bot",
      text: "",
      timestamp: new Date().toLocaleString(),
    },
  ]);
  const [formData, setFormData] = useState<{
    department: string;
    message: string;
    uploadedFile?: File | null;
    previewUrl?: string;
    subject?: string;
  }>({
    department: "",
    message: "",
    uploadedFile: null,
    previewUrl: "",
    subject: "",
  });

  const getTicketDetails = async () => {
    setIsLoading(true);
    try {
      const payload = {
        ticketid: "#1744544390947-admission",
      };
      const res = await CourseServices.getSingleTicket(payload);
      if (res?.data?.data) {
        setsupportid(res.data.data.supportid);
        const fetchedMessages = res.data.data.map((msg: any) => ({
          sender: msg.userid === 12 ? "user" : "bot",
          text: msg.message,
          timestamp: new Date(msg.created_at).toLocaleString(),
        }));
        setMessages(fetchedMessages);
      }

      setIsLoading(false);
    } catch (err) {
      error("Unable to fetch ticket details");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTicketDetails();
  }, []);

  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = {
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleString(),
    };

    const payload = {
      ticketid: id,
      message: input,
      userid: Storeduser?.user,
      supportid: supportid,
    };

    const res = await CourseServices.ticketReply(payload);
    console.log(res);

    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate a bot response with a delay
    // setTimeout(() => {
    //   const botReply = {
    //     sender: "bot",
    //     text: "This is a response!",
    //     timestamp: new Date().toLocaleString(),
    //   };

    //   setMessages((prevMessages) => [...prevMessages, botReply]);
    // }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(); // Call your send function when Enter is pressed
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if the file is an image or PDF
    const fileType = file.type;
    const previewUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      uploadedFile: file,
      previewUrl:
        fileType.startsWith("image/") || fileType === "application/pdf"
          ? previewUrl
          : undefined,
    }));
  };

  const handleFileButtonClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({
      ...prev,
      uploadedFile: null,
      previewUrl: "",
    }));
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[620px] overflow-hidden">
      {isLoading ? (
        <div className="w-full flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {messages.map((msg, index) => (
              <>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[75%] flex justify-center gap-4 items-center ${
                    msg.sender === "user" ? "self-end ml-auto" : "self-start"
                  }`}
                >
                  <Avatar
                    img=""
                    name={msg.sender === "user" ? "James Ibori" : "Fordax AI"}
                    avatarClassName="md:h-8 h-8 w-8 md:w-8 rounded-full"
                    textClassName="font-medium text-sm max-md:hidden"
                    wrapperClassName="max-md:gap-0"
                  />
                  <div className="w-full flex flex-col justify-end items-end">
                    <p
                      className={`text-lg font-semibold mb-1 ${
                        msg.sender === "user"
                          ? "text-left"
                          : "text-left text-[#FF5050]"
                      }`}
                    >
                      {msg.sender === "user" ? "James Ibori" : "Fordax AI"}
                    </p>
                    <div
                      className={` min-lg:w-[90%] px-4 py-2 rounded-md border border-[#000] ${
                        msg.sender === "user"
                          ? "bg-[#FF5050] w-full text-white self-end ml-auto"
                          : "bg-white w-full text-gray-800 self-start"
                      }`}
                    >
                      <p className="text-xl font-DMSans font-semibold">
                        {msg.text}
                      </p>
                    </div>
                    {/* Dynamic Timestamp */}
                    <p className="text-sm mt-1 italic font-DMSans font-normal text-gray-500">
                      {msg.timestamp}
                    </p>
                  </div>
                </motion.div>
              </>
            ))}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="mt-4 p-3 border-t border-gray-200">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className={cn(
                "w-full px-4 py-2 text-lg font-normal border h-[100px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5050] resize-none",
                theme === "dark" ? "bg-[#333] " : "bg-[#fff]"
              )}
            />
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-4 my-4">
                  {/* Hidden File Input */}
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <div
                      className="tooltip tooltip-right"
                      data-tip="Upload a file"
                    >
                      <button
                        type="button"
                        onClick={handleFileButtonClick}
                        className={`p-4 rounded-lg border border-[#FF5050] ${
                          theme === "dark" ? "bg-[#fff]" : "bg-[#333]"
                        }`}
                      >
                        <IoDocumentAttach className="text-[#FF5050] size-6" />
                      </button>
                    </div>
                  </label>
                  {formData.uploadedFile && (
                    <span className="text-sm text-gray-600">
                      {formData.uploadedFile.name}
                    </span>
                  )}
                </div>

                {/* Preview Section */}
                {formData.previewUrl && (
                  <div className="mt-4 relative">
                    {formData.uploadedFile?.type.startsWith("image/") ? (
                      <img
                        src={formData.previewUrl}
                        alt="Preview"
                        className="max-w-xs max-h-40 rounded-lg border"
                      />
                    ) : (
                      <iframe
                        src={formData.previewUrl}
                        className="w-full h-40 border rounded-lg"
                        title="PDF Preview"
                      />
                    )}
                    <button
                      onClick={handleRemoveFile}
                      className="absolute top-2 right-6"
                    >
                      <MdCancel className="size-6 text-[#FF5050]" />
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleSend}
                className="border border-[#FF5050] flex justify-between items-center  w-[164px] h-[45px] p-3 rounded-lg hover:text-white hover:bg-[#e14444]"
              >
                <p className="text-xl font-DMSans font-semibold">Send Now</p>
                <IoSend className="size-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleTicket;
