import { useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";

interface RichTextProps {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
}

const RichText: React.FC<RichTextProps> = ({ value, onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <div>
      <Slate editor={editor} initialValue={value} onChange={onChange}>
        <Editable
          placeholder="Enter some text..."
          className="p-4 h-[134px] border-[0.5px] border-[#ddd] rounded-md mb-2"
        />
      </Slate>
    </div>
  );
};

export default RichText;
