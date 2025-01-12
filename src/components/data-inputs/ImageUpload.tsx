import React, { useState, ChangeEvent } from "react";
import { CiCamera } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useToast from "~/hooks/useToast";

interface ImageUploadProps {
  multiple?: boolean;
  onUpload: (files: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  multiple = false,
  onUpload,
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { error } = useToast();
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      if (selectedImages.length + filesArray.length > 1) {
        error("You can upload up to one image!");
        return;
      }

      const filePreviews = filesArray.map((file) => URL.createObjectURL(file));

      setSelectedImages((prev) => [...prev, ...filePreviews]);
      onUpload(filesArray);
      return () => filePreviews.forEach((url) => URL.revokeObjectURL(url));
    }
  };

  return (
    <div className="flex justify-start items-center">
      <ToastContainer />
      <label
        htmlFor="image-upload"
        className="cursor-pointer mt-4 mr-4 flex flex-col items-center justify-center w-32 h-32 bg-transparent border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-900 transition-all"
      >
        <CiCamera className="text-[35px]" />
        <span className="font-DMSans font-semibold text-center">Upload</span>
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleImageChange}
        className="hidden"
      />
      <div className="flex flex-row justify-between scrollbar-style overflow-x-auto w-full lg:w-auto gap-4 mt-4">
        <AnimatePresence>
          {selectedImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative min-w-32 min-h-32"
            >
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="w-32 h-32 object-cover border rounded-lg"
              />
              <button
                onClick={() =>
                  setSelectedImages((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                &times;
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageUpload;
