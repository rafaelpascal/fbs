import { BaseModal } from "./BaseModal";
import { useCallback, useEffect, useState } from "react";
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
  lessonNumber?: number;
  moduleId: number;
  lessonId?: number;
  isOpen: boolean;
  closeModal: () => void;
  handlecreate: (moduleId: number) => void;
  moduleData: any;
  setModuleData: React.Dispatch<React.SetStateAction<any>>;
}

interface FormData {
  course_id?: number;
  title: string;
  embed: string;
  featuredImages: File[];
}

const initialFormData = {
  course_id: 0,
  title: "",
  embed: "",
  featuredImages: [] as File[],
};

export const NewLessonModal = ({
  lessonNumber,
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
  const [isLoading, setIsloading] = useState(false);
  //   const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    course_id: 0,
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

  const fetchSingleLesson = async () => {
    setIsloading(true);
    if (lessonId && moduleId) {
      const payload = { lesson_id: lessonId };
      const res = await CourseServices.listLessonbyId(payload);

      if (res?.data?.success && res?.data?.lessons?.length > 0) {
        const lesson = res.data.lessons[0]; // Get the first lesson

        setFormData((prev) => ({
          ...prev,
          course_id: lesson.course_id || "",
          title: lesson.lesson_title || "",
          embed: lesson.stream_video_audio || "",
          featuredImages: lesson.lesson_image ? [lesson.lesson_image] : [],
        }));

        setSelectedFile(
          lesson.upload_pdf ? new File([], lesson.upload_pdf) : null
        );
        setSelectedWord(
          lesson.upload_text ? new File([], lesson.upload_text) : null
        );
        setMediaFile(
          lesson.upload_video_audio
            ? new File([], lesson.upload_video_audio)
            : null
        );
      }
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (lessonId && moduleId) {
      fetchSingleLesson();
    }
  }, [lessonId, moduleId]);

  // const handleSubmit = async () => {
  //   setisSubmitting(true);

  //   // Create a new FormData object
  //   const dataToSubmit = new FormData();
  //   dataToSubmit.append(
  //     "course_id",
  //     courseId?.toString() || String(formData.course_id) || ""
  //   );
  //   dataToSubmit.append("stream_video_audio", formData.embed);
  //   dataToSubmit.append("lesson_number", String(lessonNumber));
  //   dataToSubmit.append("module_id", moduleId.toString() || "");
  //   dataToSubmit.append("lesson_title", formData.title);
  //   dataToSubmit.append(
  //     "stream_status",
  //     formData.embed.includes("https://www.youtube.com") ? "1" : "0"
  //   );
  //   formData.featuredImages.forEach((file) => {
  //     dataToSubmit.append("lesson_image", file);
  //   });
  //   if (selectedPdf) {
  //     dataToSubmit.append("pdf_upload", selectedPdf);
  //   }
  //   if (selectedWord) {
  //     dataToSubmit.append("word_file", selectedWord);
  //   }
  //   if (selectedMediaFile) {
  //     dataToSubmit.append("video_audio_upload", selectedMediaFile);
  //   }

  //   if (lessonId) {
  //     dataToSubmit.append("lessonid", lessonId.toString());
  //   }

  //   if (lessonId) {
  //     await CourseServices.updateCourseLesson(dataToSubmit);
  //     setModuleData((prevData: any) => ({
  //       ...prevData,
  //       number: lessonNumber,
  //       moduleId: moduleId,
  //       title: formData.title,
  //     }));
  //   } else {
  //     const res = await CourseServices.createCourseLesson(dataToSubmit);
  //     setModuleData((prevData: any) => ({
  //       ...prevData,
  //       number: res.data.data.lesson_number,
  //       moduleId: res.data.data.lesson_id,
  //       title: formData.title,
  //     }));
  //   }

  //   setisSubmitting(false);
  //   handlecreate(moduleId);
  //   setFormData(initialFormData);
  // };
  const handleSubmit = async () => {
    setisSubmitting(true);

    const dataToSubmit = new FormData();

    const courseIdValue =
      courseId?.toString() || String(formData.course_id) || "";
    const embedValue = formData.embed;
    let streamStatus = "0";

    if (embedValue.includes("youtube.com") || embedValue.includes("youtu.be")) {
      streamStatus = "1";
    } else if (embedValue.includes("drive.google.com")) {
      streamStatus = "2";
    }

    // Append form fields
    dataToSubmit.append("course_id", courseIdValue);
    dataToSubmit.append("stream_video_audio", embedValue);
    dataToSubmit.append("lesson_number", String(lessonNumber));
    dataToSubmit.append("module_id", moduleId.toString() || "");
    dataToSubmit.append("lesson_title", formData.title);
    dataToSubmit.append("stream_status", streamStatus);

    // Files
    formData.featuredImages.forEach((file) => {
      dataToSubmit.append("lesson_image", file);
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
    if (lessonId) {
      dataToSubmit.append("lessonid", lessonId.toString());
    }

    console.log("Submitting FormData payload:");
    for (let [key, value] of dataToSubmit.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      if (lessonId) {
        await CourseServices.updateCourseLesson(dataToSubmit);
        setModuleData((prevData: any) => ({
          ...prevData,
          number: lessonNumber,
          moduleId: moduleId,
          title: formData.title,
        }));
      } else {
        const res = await CourseServices.createCourseLesson(dataToSubmit);
        setModuleData((prevData: any) => ({
          ...prevData,
          number: res.data.data.lesson_number,
          moduleId: res.data.data.lesson_id,
          title: formData.title,
        }));
      }
    } catch (error) {
      console.error("Error submitting lesson:", error);
    }

    setisSubmitting(false);
    handlecreate(moduleId);
    setFormData(initialFormData);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:min-w-[1000px] "
    >
      <div className="w-full flex px-2 justify-between items-center bg-[#b8b6b6] py-3">
        <h2 className="font-DMSans text-[#fff] text-[18px] font-semibold text-center">
          NEW COURSE LESSON
        </h2>
        <button onClick={handleclose}>
          <MdCancel className="text-[30px] text-[#F01E00]" />
        </button>
      </div>
      {isLoading ? (
        <div className="flex w-full h-[600px] p-6 flex-col items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex w-full h-[600px] lg:w-[1000px] scrollbar-style overflow-y-auto p-6 flex-col items-start justify-start">
          <div>
            <h2 className="text-[17px] font-DMSans font-semibold">
              LESSON IMAGE
            </h2>
            <ImageUpload onUpload={handleImageUpload} />
          </div>

          <div className="my-4 w-full">
            <BaseInput
              label="Lesson Title"
              type="text"
              placeholder="Lesson Title"
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
          <div className="mb-4">
            <h2 className="font-DMSans font-semibold text-[18px]">
              LESSON NUMBER : {lessonNumber}
            </h2>
          </div>
          <div className="w-full">
            <PDFUpload
              initialFile={selectedPdf}
              onFileSelect={handleFileSelect}
            />
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
      )}
    </BaseModal>
  );
};
