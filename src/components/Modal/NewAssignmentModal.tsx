import { BaseModal } from "./BaseModal";
import { useCallback, useState } from "react";
import { MdCancel } from "react-icons/md";
import { cn } from "~/utils/helpers";
import { BaseInput } from "../data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import ImageUpload from "../data-inputs/ImageUpload";
import { LoadingSpinner } from "../ui/loading-spinner";
import MediaUpload from "../data-inputs/MediaUpload";
import PDFUpload from "../data-inputs/PDFUpload";
import WordUpload from "../data-inputs/WordDocUpload";
import { CourseServices } from "~/api/course";
import { RootState } from "~/redux-store/store";
import { useSelector } from "react-redux";

interface IModalPropsType {
  moduleId: number;
  lessonId: number;
  isOpen: boolean;
  closeModal: () => void;
  handlecreate: (moduleId: number) => void;
  moduleData: any;
  setModuleData: React.Dispatch<React.SetStateAction<any>>;
}

interface FormData {
  score: string;
  deadline: string;
  title: string;
  embed: string;
  featuredImages: File[];
}

const initialFormData = {
  score: "",
  deadline: "",
  title: "",
  embed: "",
  featuredImages: [] as File[],
};

export const NewAssignmentModal = ({
  moduleId,
  lessonId,
  isOpen,
  closeModal,
  handlecreate,
  setModuleData,
}: IModalPropsType) => {
  const { theme } = useTheme();
  const courseId = useSelector((state: RootState) => state.course.course_id);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [selectedPdf, setSelectedFile] = useState<File | null>(null);
  const [selectedWord, setSelectedWord] = useState<File | null>(null);
  const [selectedMediaFile, setMediaFile] = useState<File | null>(null);
  //   const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    score: "",
    deadline: "",
    title: "",
    embed: "",
    featuredImages: [],
  });
  // Close modal
  const handleclose = useCallback(() => {
    setFormData(initialFormData);
    closeModal();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      featuredImages: files,
    }));
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleWordSelect = (file: File | null) => {
    setSelectedWord(file);
  };

  const handleMediaUpload = (file: File | null) => {
    setMediaFile(file);
  };

  const handleSubmit = async () => {
    setisSubmitting(true);

    // Create a new FormData object
    const dataToSubmit = new FormData();
    dataToSubmit.append("course_id", courseId?.toString() || "");
    dataToSubmit.append("stream_video_audio", formData.embed);
    dataToSubmit.append("overall_score", formData.score);
    dataToSubmit.append("module_id", moduleId.toString() || "");
    dataToSubmit.append("lesson_id", lessonId.toString() || "");
    dataToSubmit.append("assignment_title", formData.title);
    formData.featuredImages.forEach((file) => {
      dataToSubmit.append("assignment_image", file);
    });
    if (selectedPdf) {
      dataToSubmit.append("pdf_upload", selectedPdf);
    }
    if (selectedWord) {
      dataToSubmit.append("word_file", selectedWord);
    }
    if (selectedMediaFile) {
      dataToSubmit.append("video_audio_upload", selectedMediaFile);
    }
    await CourseServices.createCourseAssignment(dataToSubmit);
    setModuleData((prevData: any) => ({
      ...prevData,
      title: formData.title,
    }));

    setisSubmitting(false);
    handlecreate(moduleId);
    setFormData(initialFormData);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:min-w-[1000px]"
    >
      <div className="w-full flex px-2 justify-between items-center bg-[#b8b6b6] py-3">
        <h2 className="font-DMSans text-[#fff] text-[18px] font-semibold text-center">
          NEW COURSE ASSIGNMENT
        </h2>
        <button onClick={handleclose}>
          <MdCancel className="text-[30px] text-[#F01E00]" />
        </button>
      </div>
      <div className="flex w-full h-[600px] lg:w-[1000px] scrollbar-style overflow-y-auto p-6 flex-col items-start justify-start">
        <div>
          <h2 className="text-[17px] font-DMSans font-semibold">
            ASSIGNMENT IMAGE
          </h2>
          <ImageUpload onUpload={handleImageUpload} />
        </div>

        <div className="my-4 w-full">
          <BaseInput
            label="Assignment Title"
            type="text"
            placeholder="Assignment Title"
            containerClassname="w-full"
            labelClassName="text-[17px] font-DMSans font-semibold"
            inputContainerClassName={cn(
              "h-[53px] ",
              theme === "dark"
                ? "select-secondary"
                : "border-[0.5px] border-[#ddd]"
            )}
            value={formData.title}
            onChange={(e: any) => handleInputChange("title", e.target.value)}
          />
        </div>
        <div className="w-full">
          <PDFUpload onFileSelect={handleFileSelect} />
        </div>
        <div className="w-full">
          <MediaUpload onMediaUpload={handleMediaUpload} />
        </div>
        <div className="w-full">
          <WordUpload onFileSelect={handleWordSelect} />
        </div>
        <div className="my-4 w-full">
          <BaseInput
            label="EMBED VIDEO/AUDIO"
            type="text"
            placeholder="EMBED VIDEO/AUDIO"
            containerClassname="w-full"
            labelClassName="text-[17px] font-DMSans font-semibold"
            inputContainerClassName={cn(
              "h-[53px] ",
              theme === "dark"
                ? "select-secondary"
                : "border-[0.5px] border-[#ddd]"
            )}
            value={formData.embed}
            onChange={(e: any) => handleInputChange("embed", e.target.value)}
          />
        </div>
        <div className="flex justify-start gap-4 flex-col lg:flex-row flex-wrap items-center">
          <div className="my-4 w-full lg:w-[30%]">
            <BaseInput
              label="Overall Score"
              type="text"
              placeholder="100"
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[53px] ",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
              value={formData.score}
              onChange={(e: any) => handleInputChange("score", e.target.value)}
            />
          </div>
          <div className="my-4 w-full lg:w-[50%]">
            <BaseInput
              label="Deadline"
              type="date"
              placeholder=""
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[53px] ",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
              value={formData.deadline}
              onChange={(e: any) =>
                handleInputChange("deadline", e.target.value)
              }
            />
          </div>
        </div>
        <div className="flex justify-start items-start gap-4">
          <button
            onClick={handleclose}
            className="w-[151px] text-[#fff] font-semibold text-[18px] font-DMSans py-2 bg-[#928d8d] rounded-[4px]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-[151px] text-[#fff] font-semibold flex justify-center items-center gap-2 text-[18px] font-DMSans py-2 bg-[#F01E00] rounded-[4px]"
          >
            <p className="font-DMSans font-semibold text-[16px] text-white">
              {" "}
              Save
            </p>
            {isSubmitting && <LoadingSpinner size="xs" />}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
