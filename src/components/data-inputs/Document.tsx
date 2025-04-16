import React, { useState } from "react";

interface FileUploadProps {
  onFileUpload: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    onFileUpload(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onFileUpload(null);
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 max-w-sm">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
      />
      {selectedFile && (
        <div className="mt-4">
          <p className="text-sm ">Selected File: {selectedFile.name}</p>
          <button
            onClick={handleRemoveFile}
            className="mt-2 px-4 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Remove File
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
