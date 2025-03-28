import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { FaFilePdf } from "react-icons/fa";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { LiaUndoSolid } from "react-icons/lia";

interface PDFUploadProps {
  onFileSelect: (file: File | null) => void;
  initialFile?: File | null;
}

const PDFUpload: React.FC<PDFUploadProps> = ({ onFileSelect, initialFile }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [showpreview, setshowpreview] = useState(false);

  useEffect(() => {
    if (initialFile && typeof initialFile === "string") {
      setFile(null);
    } else if (initialFile instanceof File) {
      setFile(initialFile);
    }
  }, [initialFile]);

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

  // Handle file removal
  const handleRemoveFile = () => {
    setFile(null);
    onFileSelect(null);
    setshowpreview(false);
  };

  const filePreview =
    file || (typeof initialFile === "string" ? initialFile : null);
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
          <div className="flex justify-start items-center mb-4 gap-4">
            <button
              onClick={() => setshowpreview(false)}
              className="rounded-[8px] border-[0.5px] border-[#ddd] flex justify-start items-center gap-2 shadow-md px-2 py-2"
            >
              <LiaUndoSolid className="text-[20px]" />
              <h2 className="text-[14px] font-semibold">Back</h2>
            </button>
            <button
              onClick={handleRemoveFile}
              className="rounded-[8px] border-[0.5px] border-red-500 flex justify-center items-center gap-2 shadow-md px-2 py-2 bg-red-100"
            >
              <span className="text-[14px] font-semibold text-red-500">
                <BiTrash className="text-[20px]" />
              </span>
            </button>
          </div>
          {/* {file && (
            <div className="mb-4">
              <iframe
                src={URL.createObjectURL(file)}
                className="w-full h-[400px] border"
                title="PDF Preview"
              />
            </div>
          )} */}
          {filePreview ? (
            <div className="mb-4">
              <iframe
                src={
                  typeof filePreview === "string"
                    ? filePreview
                    : URL.createObjectURL(filePreview)
                }
                className="w-full h-[400px] border"
                title="PDF Preview"
              />
            </div>
          ) : null}
        </div>
      ) : (
        <label
          htmlFor="pdfInput"
          className="w-full cursor-pointer flex justify-between p-4 items-center h-[140px] border-[0.5px] border-[#B3B3B3] rounded-md"
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
          {file !== null && (
            <div className="flex justify-between items-center gap-2">
              <button
                onClick={handleRemoveFile}
                className="rounded-[8px] border-[0.5px] border-red-500 flex justify-center items-center gap-2 shadow-md px-2 py-2 bg-red-100"
              >
                <span className="text-[14px] font-semibold text-red-500">
                  <BiTrash className="text-[20px]" />
                </span>
              </button>
              <button onClick={() => setshowpreview(true)} className="">
                <HiOutlineDocumentMagnifyingGlass className="text-[50px]" />
              </button>
            </div>
          )}
        </label>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default PDFUpload;
