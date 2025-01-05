import { useState } from "react";
import { Descendant } from "slate";
import RichText from "~/components/data-inputs/RichText";
import FormRequirements from "./FormRequirements";
import { CourseServices } from "~/api/course";
import { showAlert } from "~/utils/sweetAlert";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { useSelector } from "react-redux";
import { RootState } from "~/redux-store/store";

type CustomElement = {
  type: "paragraph";
  children: { text: string }[];
};

type CustomDescendant = CustomElement & Descendant;

const CredentialsForms = ({ created }: any) => {
  const courseId = useSelector((state: RootState) => state.course.course_id);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [admissionRequirements, setAdmissionRequirements] = useState<
    CustomDescendant[]
  >([{ type: "paragraph", children: [{ text: "" }] }]);
  const [learningObjectives, setLearningObjectives] = useState<
    CustomDescendant[]
  >([{ type: "paragraph", children: [{ text: "" }] }]);
  const [assessmentMethods, setAssessmentMethods] = useState<
    CustomDescendant[]
  >([{ type: "paragraph", children: [{ text: "" }] }]);
  const [careerOptions, setCareerOptions] = useState<CustomDescendant[]>([
    { type: "paragraph", children: [{ text: "" }] },
  ]);
  const [courseStructure, setCourseStructure] = useState<CustomDescendant[]>([
    { type: "paragraph", children: [{ text: "" }] },
  ]);
  const [courseFor, setCourseFor] = useState<CustomDescendant[]>([
    { type: "paragraph", children: [{ text: "" }] },
  ]);

  const handleSubmit = async () => {
    setisSubmitting(true);
    const extractText = (nodes: CustomDescendant[]): string => {
      return nodes
        .map((node) => node.children.map((child) => child.text).join(""))
        .join("\n");
    };

    const payload = {
      course_id: courseId,
      course_requirments: extractText(admissionRequirements),
      learning_objective: extractText(learningObjectives),
      assessment_method: extractText(assessmentMethods),
      career_option: extractText(careerOptions),
      course_structure: extractText(courseStructure),
      course_for: extractText(courseFor),
    };
    try {
      console.log("Payload:", payload);
      const res = await CourseServices.createCourseRequirements(payload);
      console.log("Response:", res);
      setisSubmitting(false);
      await showAlert(
        "success",
        "Created!",
        "Proceed with Course Builder!",
        "Ok",
        "#03435F"
      );
      created();
    } catch (error) {
      setisSubmitting(false);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          ADMISSION REQUIREMENTS
        </h2>
        <RichText
          value={admissionRequirements}
          onChange={(value) =>
            setAdmissionRequirements(value as CustomDescendant[])
          }
        />
      </div>
      <div className="">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          LEARNING OBJECTIVES
        </h2>
        <RichText
          value={learningObjectives}
          onChange={(value) =>
            setLearningObjectives(value as CustomDescendant[])
          }
        />
      </div>
      <div className="">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          ASSESSMENT METHODS
        </h2>
        <RichText
          value={assessmentMethods}
          onChange={(value) =>
            setAssessmentMethods(value as CustomDescendant[])
          }
        />
      </div>
      <div className="">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          CAREER OPTIONS & OPPORTUNITIES
        </h2>
        <RichText
          value={careerOptions}
          onChange={(value) => setCareerOptions(value as CustomDescendant[])}
        />
      </div>
      <div className="">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          COURSE STRUCTURE
        </h2>
        <RichText
          value={courseStructure}
          onChange={(value) => setCourseStructure(value as CustomDescendant[])}
        />
      </div>
      <div className="">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          WHO IS THIS COURSE FOR?
        </h2>
        <RichText
          value={courseFor}
          onChange={(value) => setCourseFor(value as CustomDescendant[])}
        />
      </div>
      <div className="shadow-md my-4 p-4">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          FORM REQUIREMENTS
        </h2>
        <FormRequirements />
      </div>
      <button className="h-[52px] w-[231px] mr-4 mb-2 px-4 font-DMSans font-semibold text-[16px] rounded-md bg-transparent border-[1px] border-[#ddd]">
        PREVIEW
      </button>
      <button
        onClick={handleSubmit}
        className="h-[52px] bg-[#FF5050] w-[231px] mb-2 px-4 rounded-md flex justify-center items-center gap-2"
      >
        <p className="font-DMSans font-semibold text-[16px] text-white">
          SAVE ALL CHANGES
        </p>
        {isSubmitting && <LoadingSpinner size="xs" />}
      </button>
    </div>
  );
};

export default CredentialsForms;
