import React, { useState } from "react";
import SelectionDropdown from "../Collapsible/SelectionDropdown";
import { BaseInput } from "../data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import { IoDocumentAttach } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { cn } from "~/utils/helpers";

const options = [
  { label: "Study Support", value: "Study Support" },
  { label: "Admissions/Program", value: "Admissions/Program" },
  { label: "Legal & Compliance", value: "Legal & Compliance" },
  { label: "Technical Problem", value: "Technical Problem" },
  { label: "Payment/Billing", value: "Payment/Billing" },
  { label: "Testimonial", value: "Testimonial" },
];

const Support = ({
  setReportData,
}: {
  setReportData: React.Dispatch<React.SetStateAction<any>>;
}) => {
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
  const { theme } = useTheme();

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

  const handleSubmit = () => {
    setReportData((prevData: any) => ({
      ...prevData,
      subject: formData.subject,
      message: formData.message,
    }));
  };
  const isFormValid =
    formData.message.trim() !== "" && formData.department.trim() !== "";
  function handleInputChange(field: string, value: any) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <div>
      {/* Department Selection Dropdown */}
      <SelectionDropdown
        label="Department"
        labelClassName="text-[18px] font-DMSans font-semibold mb-2"
        options={options}
        onSelect={(option) =>
          setFormData((prev) => ({ ...prev, department: option.value }))
        }
        placeholder="Select Department"
        initialSelected={
          formData.department
            ? { label: formData.department, value: formData.department }
            : null
        }
      />

      <div className="my-6">
        <h2 className="text-lg mb-2 text-left font-DMSans font-semibold ">
          Related program/Course{" "}
        </h2>
        <p className="p-4 rounded-lg border border-[#D7DBDE] text-xl text-left font-DMSans font-semibold ">
          Filled: Program title. Module. Lesson
        </p>
      </div>

      <BaseInput
        label="Subject"
        placeholder="Subject"
        containerClassname="w-full"
        labelClassName="text-[18px] font-DMSans font-semibold"
        inputContainerClassName={cn(
          "h-[48px] ",
          theme === "dark" ? "select-secondary" : "border-[0.5px] border-[#ddd]"
        )}
        value={formData.subject}
        onChange={(e: any) => handleInputChange("subject", e.target.value)}
      />

      {/* Message Input */}
      <div className="my-4">
        <BaseInput
          label="Message"
          type="textarea"
          placeholder="Type Message"
          containerClassname="w-full"
          labelClassName="text-[18px] font-DMSans font-semibold"
          inputContainerClassName={`h-[153px] ${
            theme === "dark"
              ? "select-secondary"
              : "border-[0.5px] border-[#ddd]"
          }`}
          value={formData.message}
          onChange={(e: any) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
        />
      </div>
      <div className="flex justify-between items-start">
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

        {/* Send Button */}
        <button
          onClick={handleSubmit}
          className={`p-4 rounded-lg border font-semibold font-DMSans text-sm border-[#FF5050] mt-4 ${
            isFormValid
              ? "hover:bg-[#FF5050] hover:border-[#fff] hover:text-[#fff]"
              : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!isFormValid} // Button is disabled when the form is invalid
        >
          Send message
        </button>
      </div>
    </div>
  );
};

export default Support;
