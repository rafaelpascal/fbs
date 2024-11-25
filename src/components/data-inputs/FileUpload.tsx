import React, { useState, useCallback } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

interface FileUploadProps {
  onFilesSelected: (files: FileList | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);
    onFilesSelected(files);
  };

  // Handle drag and drop events
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
      setSelectedFiles(files);
      onFilesSelected(files);
    },
    [onFilesSelected]
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
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload-input"
        />
        <label
          htmlFor="file-upload-input"
          className="flex justify-between items-center text-[16px] text-left text-gray-600"
        >
          {selectedFiles && selectedFiles.length > 0
            ? `Selected ${selectedFiles.length} file(s)`
            : "Drag and drop files here OR Browse Files Max File Size: 50MB"}
          <MdOutlineCloudUpload className="text-[34px]" />
        </label>
      </div>

      {/* Optional: Display the selected files */}
      {selectedFiles && selectedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
          <ul className="list-disc list-inside">
            {Array.from(selectedFiles).map((file, index) => (
              <li key={index} className="text-gray-700">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
