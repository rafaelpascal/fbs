import React, { useState } from "react";
import { LiaUndoSolid } from "react-icons/lia";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { TbPlayerPlayFilled } from "react-icons/tb";

interface MediaUploadProps {
  onMediaUpload: (file: File | null) => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onMediaUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [showpreview, setshowpreview] = useState(false);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const selectedFile = event.target.files?.[0];

    console.log(selectedFile?.name);
    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      onMediaUpload(null);
      return;
    }

    // Validate file type (video/audio)
    const validTypes = ["video/mp4", "audio/mpeg", "audio/wav"];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Only MP4 videos or MP3/WAV audio files are allowed.");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    onMediaUpload(selectedFile);
  };

  return (
    <div className="mb-4 flex flex-col justify-between items-start w-full ">
      {showpreview ? (
        <h2 className="text-xl font-bold mb-4">Previewing...</h2>
      ) : (
        <h2 className="text-xl font-bold mb-4">UPLOAD VIDEO/AUDIO</h2>
      )}
      <input
        id="fileInput"
        type="file"
        accept="video/mp4,audio/mpeg,audio/wav"
        onChange={handleFileChange}
        className="hidden w-full"
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
          {file?.type.startsWith("video/") ? (
            <video controls className="w-full max-h-64">
              <source src={preview ?? ""} type={file.type} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <audio controls className="w-full">
              <source src={preview ?? ""} type={file?.type} />
              Your browser does not support the audio tag.
            </audio>
          )}
        </div>
      ) : (
        <label
          htmlFor="fileInput"
          className="w-full flex justify-between p-4 items-center h-[140px] border-[0.5px] border-[#B3B3B3] rounded-md"
        >
          <div className="flex justify-start items-center gap-4">
            <div className="w-[40px] flex justify-center items-center h-[40px] rounded-full border-[0.5px] border-[#B3B3B3]">
              <TbPlayerPlayFilled className="text-[30px]" />
            </div>
            {file?.name ? (
              <p className="text-[20px] font-DMSans font-semibold">
                {file?.name}
              </p>
            ) : (
              <p className="text-[20px] font-DMSans font-semibold">
                Browse audio/video for upload
              </p>
            )}
          </div>
          <button onClick={() => setshowpreview(true)} className="">
            <HiOutlineDocumentMagnifyingGlass className="text-[50px]" />
          </button>
        </label>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default MediaUpload;