import React, { useState } from "react";
import { IoDocumentAttach, IoSend } from "react-icons/io5";
import { getSlideAnimation } from "~/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "~/context/theme-provider";
import { MdCancel } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

const SendEmail = ({ handleGoback }: { handleGoback: () => void }) => {
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
    <div>
      <button
        onClick={handleGoback}
        className="border border-[#FF5050] flex justify-between items-center gap-2 py-2 px-3 rounded-lg hover:text-white hover:bg-[#e14444]"
      >
        <FaArrowLeftLong className="size-4" />
        <p className="text-sm font-DMSans font-semibold">Back</p>
      </button>
      <motion.div
        {...getSlideAnimation({ slideDirection: "right" })}
        transition={{ duration: 0.5 }}
        className="w-full rounded-md shadow-md border border-[#ddd] my-2"
      >
        <div className="w-full h-[100px] px-10  rounded-t-md flex justify-start items-center bg-[#596C92]">
          <h2 className="font-DMSans font-bold text-2xl text-white">
            New Message
          </h2>
        </div>
        <div className="flex p-4 flex-col gap-2">
          {/* From Name */}
          <div className="flex flex-col lg:flex-row justify-start items-center min-w-[200px]">
            <label className="w-full lg:w-[20%] block font-DMSans text-lg font-medium text-gray-700 mb-1">
              From Name
            </label>
            <input
              type="text"
              placeholder="Enter sender name"
              className="w-full font-DMSans text-lg px-2 border-b outline-none border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          {/* From Email */}
          <div className="flex flex-col lg:flex-row justify-start items-center min-w-[200px]">
            <label className="w-full lg:w-[20%] font-DMSans text-lg block font-medium text-gray-700 mb-1">
              From Email
            </label>
            <input
              type="email"
              placeholder="Enter sender email"
              className="w-full px-2 border-b font-DMSans text-lg outline-none border-gray-300 rounded-md focus:outline-none "
            />
          </div>

          {/* Reply To */}
          <div className="flex flex-col lg:flex-row justify-start items-center min-w-[200px]">
            <label className="w-full lg:w-[20%]  block font-DMSans text-lg font-medium text-gray-700 mb-1">
              To accounts
            </label>
            <input
              type="email"
              defaultValue="Marcus2345@gmail.com"
              className="w-full px-2 border-b font-DMSans text-lg outline-none border-gray-300 rounded-md focus:outline-none "
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col lg:flex-row justify-start items-center min-w-[200px]">
            <label className="w-full lg:w-[20%] block font-DMSans text-lg font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-2 font-DMSans text-lg border-b outline-none border-gray-300 rounded-md focus:outline-none "
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col lg:flex-row justify-start items-center min-w-[200px]">
            <label className="w-full lg:w-[20%] block font-DMSans text-lg font-medium text-gray-700 mb-1">
              Preview text
            </label>
            <input
              type="text"
              placeholder="Preview text"
              className="w-full px-2 font-DMSans text-lg border-b outline-none border-gray-300 rounded-md focus:outline-none "
            />
          </div>
        </div>
        <div className="px-4 lg:px-60 flex flex-col lg:flex-row justify-start gap-4 items-start lg:items-center">
          <label className="flex gap-2 justify-center items-center fieldset-label">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-error"
            />
            <p className="font-DMSans font-semibold text-lg">
              In-app notification
            </p>
          </label>
          <label className="flex gap-2 justify-center items-center fieldset-label">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-error"
            />
            <p className="font-DMSans font-semibold text-lg">
              WhatsApp notification
            </p>
          </label>
        </div>
        <div className="p-2 w-full">
          <textarea
            placeholder="Type your message here..."
            rows={8}
            className="w-full p-2 placeholder:font-DMSans placeholder:font-semibold border font-DMSans text-lg outline-none rounded-md resize-none focus:outline-none"
          ></textarea>
        </div>
        <div className="flex px-4 justify-between items-center">
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
                <div className="tooltip tooltip-right" data-tip="Upload a file">
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
            <p className="text-xl font-DMSans font-semibold">Send Now</p>
            <IoSend className="size-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SendEmail;
