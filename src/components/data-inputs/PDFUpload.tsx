import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { LiaUndoSolid } from "react-icons/lia";

interface PDFUploadProps {
  onFileSelect: (file: File | null) => void;
}

const PDFUpload: React.FC<PDFUploadProps> = ({ onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [showpreview, setshowpreview] = useState(false);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Validate file type
    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  // Handle file upload
  //   const handleUpload = () => {
  //     if (!file) {
  //       alert("No file selected.");
  //       return;
  //     }

  //     // Mock upload
  //     console.log("Uploading file:", file);
  //     alert("File uploaded successfully!");
  //   };

  return (
    <div className="mb-4 w-full">
      {showpreview ? (
        <h2 className="text-xl font-bold mb-4">Previewing {file?.name}</h2>
      ) : (
        <h2 className="text-xl font-bold mb-4">UPLOAD PDF</h2>
      )}
      {/* Hidden File Input */}
      <input
        id="pdfInput"
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      {showpreview ? (
        <div className="mb-4 w-full">
          <button
            onClick={() => setshowpreview(false)}
            className="rounded-[8px] border-[0.5px] border-[#ddd] mb-4 flex justify-start items-center gap-2 shadow-md px-2 py-2"
          >
            <LiaUndoSolid className="text-[20px]" />
            <h2 className="text-[14px] font-semibold">Back</h2>
          </button>
          {file && (
            <div className="mb-4">
              <iframe
                src={URL.createObjectURL(file)}
                className="w-full h-[400px] border"
                title="PDF Preview"
              />
            </div>
          )}
        </div>
      ) : (
        <label
          htmlFor="pdfInput"
          className="w-full flex justify-between p-4 items-center h-[140px] border-[0.5px] border-[#B3B3B3] rounded-md"
        >
          <div className="flex justify-start items-center gap-4">
            <div className="w-[40px] flex justify-center items-center h-[40px] rounded-full border-[0.5px] border-[#B3B3B3]">
              <FaFilePdf className="text-[30px]" />
            </div>
            {file?.name ? (
              <p className="text-[20px] font-DMSans font-semibold">
                {file?.name}
              </p>
            ) : (
              <p className="text-[20px] font-DMSans font-semibold">
                Browse PDF
              </p>
            )}
          </div>
          <button onClick={() => setshowpreview(true)} className="">
            <HiOutlineDocumentMagnifyingGlass className="text-[50px]" />
          </button>
        </label>
      )}

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* File preview */}

      {/* Upload button */}
      {/* <button
        onClick={handleUpload}
        disabled={!file}
        className={`px-4 py-2 rounded ${
          file
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        Upload
      </button> */}
    </div>
  );
};

export default PDFUpload;
