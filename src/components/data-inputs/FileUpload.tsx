import React, { useState, useCallback } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

interface FileUploadProps {
  onFilesSelected: (file: File) => void; // Pass single File or array of Files
  multiple?: boolean; // Allow multiple files if true
  label?: string; // Add label for individual uploads
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  multiple = false,
  label,
}) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles(newFiles);
      onFilesSelected(newFiles[0]);
    }
  };

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      setDragging(false);

      const newFiles = Array.from(files);
      setSelectedFiles(newFiles);
      onFilesSelected(newFiles[0]);
    },
    [multiple, onFilesSelected]
  );

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-md p-6 cursor-pointer transition-colors ${
          dragging
            ? "border-blue-500 bg-blue-100"
            : "border-gray-300 bg-gray-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
          id={`file-upload-input-${label}`}
        />
        <label
          htmlFor={`file-upload-input-${label}`}
          className="flex justify-between items-center text-[16px] text-left text-gray-600"
        >
          {selectedFiles.length > 0
            ? `Selected ${selectedFiles.length} file(s)`
            : label}
          <MdOutlineCloudUpload className="text-[34px]" />
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
