import { BaseModal } from "./BaseModal";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { motion } from "framer-motion";
import { getSlideAnimation } from "~/lib/utils";
import { IoDocumentAttach, IoSend } from "react-icons/io5";
import { useTheme } from "~/context/theme-provider";

interface IModalPropsType {
  ticketId?: number;
  isOpen: boolean;
  message?: string;
  closeModal: () => void;
}

const pendingTicketData = [
  {
    id: 1,
    name: "John Doe",
    subject: "Issue with payment",
    department: "Billing",
    createdAt: "2023-10-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    subject: "Technical issue",
    department: "Support",
    createdAt: "2023-10-02",
  },
];
export const PendingTicketsReply = ({
  isOpen,
  closeModal,
}: IModalPropsType) => {
  const { theme } = useTheme();
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
  const [isReplyTicket, setIsReplyTicket] = useState(false);
  const [isTicketReply, setIsTicketReply] = useState({
    status: false,
    id: 0,
  });

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
  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:min-w-[1000px] "
    >
      <div className="w-full flex px-2 justify-between items-center bg-[#b8b6b6] py-3">
        <h2 className="font-DMSans text-[#fff] text-[18px] font-semibold text-center">
          MESSAGE
        </h2>
        <button onClick={closeModal}>
          <MdCancel className="text-[30px] text-[#F01E00]" />
        </button>
      </div>
      <div className="p-4">
        {pendingTicketData.map((ticket) => (
          <button
            key={ticket.id}
            onClick={() =>
              setIsTicketReply({
                status: true,
                id: ticket.id,
              })
            }
            className="w-full overflow-x-auto border-b border-[#ddd] p-4 flex justify-between items-center"
          >
            <div className="flex justify-start items-center gap-4">
              <h2 className="font-DMSans font-normal text-sm lg:text-lg">
                <span className="font-bold">{ticket.name}:</span>{" "}
                {ticket.subject}
              </h2>
            </div>
            <h2 className="font-DMSans mr-3 font-normal text-sm lg:text-lg">
              {ticket.department}
            </h2>
            <h2 className="hidden lg:block font-DMSans font-normal text-sm lg:text-lg">
              {ticket.createdAt}
            </h2>
          </button>
        ))}

        {isTicketReply.status && (
          <>
            <div className="w-[1000px] flex justify-start items-center gap-3 mt-6">
              <h2 className="hidden lg:block font-DMSans font-normal text-sm lg:text-lg">
                Study anywhere, graduate in Abuja! Earn your certificate in just
                3-6 months while gaining real-world skills, expanding your
                network, and learning from top executives—all without quitting
                your job. Fast-track your success! Complete your studies in 3-6
                months, gain practical skills, earn a valuable certification,
                and connect with industry leaders—all while keeping your job.
                Upgrade your career in 3-6 months! Study from anywhere, graduate
                in Abuja, gain hands-on experience, and network with top
                professionals—all
              </h2>
            </div>
            {isReplyTicket && (
              <motion.div
                {...getSlideAnimation({ slideDirection: "right" })}
                transition={{ duration: 0.5 }}
                className="w-full p-4 rounded-md border border-[#ED342B] my-2"
              >
                <div className="flex flex-col gap-2">
                  {/* From Name */}
                  <div className="flex justify-start items-center min-w-[200px]">
                    <label className="w-[20%] block font-DMSans text-lg font-medium text-gray-700 mb-1">
                      From Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter sender name"
                      className="w-full font-DMSans text-lg px-2 border-b outline-none border-gray-300 rounded-md focus:outline-none"
                    />
                  </div>

                  {/* From Email */}
                  <div className="flex min-w-[200px]">
                    <label className="w-[20%] font-DMSans text-lg block font-medium text-gray-700 mb-1">
                      From Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter sender email"
                      className="w-full px-2 border-b font-DMSans text-lg outline-none border-gray-300 rounded-md focus:outline-none "
                    />
                  </div>

                  {/* Reply To */}
                  <div className="flex min-w-[200px]">
                    <label className="w-[20%]  block font-DMSans text-lg font-medium text-gray-700 mb-1">
                      Reply To
                    </label>
                    <input
                      type="email"
                      defaultValue="Marcus2345@gmail.com"
                      className="w-full px-2 border-b font-DMSans text-lg outline-none border-gray-300 rounded-md focus:outline-none "
                    />
                  </div>

                  {/* Subject */}
                  <div className="flex min-w-[200px]">
                    <label className="w-[20%] block font-DMSans text-lg font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Filled from inquiry"
                      className="w-full px-2 font-DMSans text-lg border-b outline-none border-gray-300 rounded-md focus:outline-none "
                    />
                  </div>
                </div>
                <div className="w-full">
                  <textarea
                    placeholder="Type your message here..."
                    rows={8}
                    className="w-full p-2 font-DMSans text-lg outline-none rounded-md resize-none focus:outline-none"
                  ></textarea>
                </div>
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

                  <button className="border border-[#FF5050] flex justify-between items-center  w-[164px] h-[45px] p-3 rounded-lg hover:text-white hover:bg-[#e14444]">
                    <p className="text-xl font-DMSans font-semibold">
                      Send Now
                    </p>
                    <IoSend className="size-5" />
                  </button>
                </div>
              </motion.div>
            )}
            <div className="w-full flex justify-start items-center gap-3 mt-6">
              <button
                onClick={() => setIsReplyTicket(!isReplyTicket)}
                className="w-auto px-8 py-2 rounded-[5px] text-[#fff] text-[16px] font-bold font-DMSans bg-[#ED342B] hover:bg-[#ED342B]/50 h-[36px] flex justify-center items-center"
              >
                {isReplyTicket ? "Close" : "Reply"}
              </button>
            </div>
          </>
        )}
      </div>
    </BaseModal>
  );
};
