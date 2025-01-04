import { useState } from "react";
import { Descendant } from "slate";
import RichText from "~/components/data-inputs/RichText";
import FormRequirements from "./FormRequirements";

type CustomElement = {
  type: "paragraph";
  children: { text: string }[];
};

type CustomDescendant = CustomElement & Descendant;

const CredentialsForms = ({ created }: any) => {
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

  const handleSubmit = () => {
    const extractText = (nodes: CustomDescendant[]): string => {
      return nodes
        .map((node) => node.children.map((child) => child.text).join(""))
        .join("\n");
    };

    const payload = {
      admissionRequirements: extractText(admissionRequirements),
      learningObjectives: extractText(learningObjectives),
      assessmentMethods: extractText(assessmentMethods),
      careerOptions: extractText(careerOptions),
      courseStructure: extractText(courseStructure),
      courseFor: extractText(courseFor),
    };

    console.log("Payload:", payload);
    created();
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
        className="h-[52px] w-[231px] mb-2 px-4 font-DMSans font-semibold text-[16px] text-white rounded-md bg-[#FF5050]"
      >
        SAVE ALL CHANGES
      </button>
    </div>
  );
};

export default CredentialsForms;
