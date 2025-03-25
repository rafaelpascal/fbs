import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux-store/store";
import FormRequirements from "./FormRequirements";
import { CourseServices } from "~/api/course";
import { showAlert } from "~/utils/sweetAlert";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import RichTextEditor from "~/components/data-inputs/RichtextQuill";
import { Descendant } from "slate";

type CustomElement = {
  type: "paragraph";
  children: { text: string }[];
};

export interface CourseRequirement {
  requirementid: number;
  course_id: number;
  course_requirements: string;
  learning_objective: string;
  assessment_method: string;
  career_option: string;
  course_structure: string;
  course_for: string;
}

interface CredentialsFormsProps {
  initialCourseId: number;
  initialData: CourseRequirement[];
  created: any; // You can replace `any` with a specific type if you know what `created` is.
}

type CustomDescendant = CustomElement & Descendant;

const parseHtmlToText = (htmlString: string): CustomDescendant[] => {
  // Temporary element to extract text
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlString;
  return [
    { type: "paragraph", children: [{ text: tempElement.innerText || "" }] },
  ];
};

const CredentialsForms: React.FC<CredentialsFormsProps> = ({
  initialCourseId,
  initialData,
  created,
}) => {
  const courseId = useSelector((state: RootState) => state.course.course_id);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setAdmissionRequirements(
        parseHtmlToText(initialData[0].course_requirements)
      );
      setLearningObjectives(parseHtmlToText(initialData[0].learning_objective));
      setAssessmentMethods(parseHtmlToText(initialData[0].assessment_method));
      setCareerOptions(parseHtmlToText(initialData[0].career_option));
      setCourseStructure(parseHtmlToText(initialData[0].course_structure));
      setCourseFor(parseHtmlToText(initialData[0].course_for));
    }
  }, [initialData]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const extractText = (nodes: CustomDescendant[]): string => {
      return nodes
        .map((node) => node.children.map((child) => child.text).join(""))
        .join("\n");
    };

    const payload = {
      course_id: courseId || initialCourseId,
      course_requirments: extractText(admissionRequirements),
      learning_objective: extractText(learningObjectives),
      assessment_method: extractText(assessmentMethods),
      career_option: extractText(careerOptions),
      course_structure: extractText(courseStructure),
      course_for: extractText(courseFor),
    };
    try {
      await CourseServices.createCourseRequirements(payload);
      setIsSubmitting(false);
      await showAlert(
        "success",
        "Created!",
        "Proceed with Course Builder!",
        "Ok",
        "#03435F"
      );
      created();
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mt-6">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          ADMISSION REQUIREMENTS
        </h2>
        <RichTextEditor
          value={admissionRequirements
            .map((node) => node.children[0].text)
            .join("")} // Pass the string value
          onChange={(value: string) => {
            setAdmissionRequirements([
              { type: "paragraph", children: [{ text: value }] }, // Convert back to CustomDescendant format
            ]);
          }}
        />
      </div>
      <div className="mt-6">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          PROGRAM OBJECTIVES
        </h2>
        <RichTextEditor
          value={learningObjectives
            .map((node) => node.children[0].text)
            .join("")}
          onChange={(value: string) => {
            setLearningObjectives([
              { type: "paragraph", children: [{ text: value }] },
            ]);
          }}
        />
      </div>
      <div className="mt-6">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          ASSESSMENT METHODS
        </h2>
        <RichTextEditor
          value={assessmentMethods
            .map((node) => node.children[0].text)
            .join("")}
          onChange={(value: string) => {
            setAssessmentMethods([
              { type: "paragraph", children: [{ text: value }] },
            ]);
          }}
        />
      </div>
      <div className="mt-6">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          CAREER OPTIONS & OPPORTUNITIES
        </h2>
        <RichTextEditor
          value={careerOptions.map((node) => node.children[0].text).join("")}
          onChange={(value: string) => {
            setCareerOptions([
              { type: "paragraph", children: [{ text: value }] },
            ]);
          }}
        />
      </div>
      <div className="mt-6">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          COURSE STRUCTURE
        </h2>
        <RichTextEditor
          value={courseStructure.map((node) => node.children[0].text).join("")}
          onChange={(value: string) => {
            setCourseStructure([
              { type: "paragraph", children: [{ text: value }] },
            ]);
          }}
        />
      </div>
      <div className="mt-6">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          WHO IS THIS COURSE FOR?
        </h2>
        <RichTextEditor
          value={courseFor.map((node) => node.children[0].text).join("")}
          onChange={(value: string) => {
            setCourseFor([{ type: "paragraph", children: [{ text: value }] }]);
          }}
        />
      </div>
      <div className="shadow-md my-4 p-4">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          FORM REQUIREMENTS
        </h2>
        <FormRequirements />
      </div>
      <div className="flex flex-col lg:flex-row flex-wrap justify-start items-center">
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
    </div>
  );
};

export default CredentialsForms;
