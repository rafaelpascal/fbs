import { useState } from "react";
import { Descendant } from "slate";
import RichText from "~/components/data-inputs/RichText";

type CustomElement = {
  type: "paragraph";
  children: { text: string }[];
};

type CustomDescendant = CustomElement & Descendant;

const CredentialsForms = () => {
  const [admissionRequirements, SetAdmissionRequirements] = useState<
    CustomDescendant[]
  >([{ type: "paragraph", children: [{ text: "Start typing here..." }] }]);

  const handleEditorChange = (value: Descendant[]) => {
    console.log(value);

    SetAdmissionRequirements(value as CustomDescendant[]);
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
    </div>
  );
};

export default CredentialsForms;
