import React, { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

const PDFUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const processFile = (file: File | undefined) => {
    if (file) {
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setError("");
      } else {
        setSelectedFile(null);
        setError("Only PDF files are allowed.");
      }
    }
  };

  //   const handleUpload = () => {
  //     if (selectedFile) {
  //       const formData = new FormData();
  //       formData.append("file", selectedFile);

  //       fetch("/upload", {
  //         method: "POST",
  //         body: formData,
  //       })
  //         .then((response) => {
  //           if (response.ok) {
  //             alert("File uploaded successfully!");
  //           } else {
  //             alert("File upload failed.");
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error uploading file:", error);
  //         });
  //     }
  //   };

  return (
    <div
      className="pdf-uploader p-4 h-[469px] w-full rounded-md flex flex-col justify-center items-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500"
      onClick={() => document.getElementById("file-input")?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <MdOutlineCloudUpload className="text-[100px]" />
      <input
        type="file"
        accept="application/pdf"
        id="file-input"
        onChange={handleFileChange}
        className="hidden"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {selectedFile ? (
        <p className="text-green-600 text-sm">
          Selected file: {selectedFile.name}
        </p>
      ) : (
        <div>
          <p className="text-[20px] font-DMSans font-semibold">
            Upload a PDF of your response
          </p>
          <p className="text-[20px] font-DMSans font-normal italic">
            Drag & drop or browse files here
          </p>
        </div>
      )}
      {/* <button
        onClick={handleUpload}
        disabled={!selectedFile}
        className={`mt-4 px-4 py-2 text-white rounded-md ${
          selectedFile
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Upload
      </button> */}
    </div>
  );
};

export default PDFUploader;
