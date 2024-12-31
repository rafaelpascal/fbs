import { useState } from "react";
import { Descendant } from "slate";
import RichText from "~/components/data-inputs/RichText";

type CustomElement = {
  type: "paragraph";
  children: { text: string }[];
};

type CustomDescendant = CustomElement & Descendant;

const CredentialsForms = ({ created }: any) => {
  const [admissionRequirements, SetAdmissionRequirements] = useState<
    CustomDescendant[]
  >([{ type: "paragraph", children: [{ text: "Start typing here..." }] }]);

  const handleEditorChange = (value: Descendant[]) => {
    console.log(value);

    SetAdmissionRequirements(value as CustomDescendant[]);
  };

  const handleSubmit = () => {
    created();
  };

  return (
    <div>
      <div className="">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          ADMISSION REQUIREMENTS
        </h2>
        <RichText value={admissionRequirements} onChange={handleEditorChange} />
      </div>
      <div className="">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          LEARNING OBJECTIVES
        </h2>
        <RichText value={admissionRequirements} onChange={handleEditorChange} />
      </div>
      <div className="">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          ASSESSMENT METHODS
        </h2>
        <RichText value={admissionRequirements} onChange={handleEditorChange} />
      </div>
      <div className="">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          CAREER OPTIONS & OPPORTUNITIES
        </h2>
        <RichText value={admissionRequirements} onChange={handleEditorChange} />
      </div>
      <div className="">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          COURSE STRUCTURE
        </h2>
        <RichText value={admissionRequirements} onChange={handleEditorChange} />
      </div>
      <div className="">
        <h2 className="font-DMSans mb-2 text-[16px] font-semibold">
          WHO IS THIS COURSE FOR?
        </h2>
        <RichText value={admissionRequirements} onChange={handleEditorChange} />
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
