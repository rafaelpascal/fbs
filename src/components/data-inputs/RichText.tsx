import React, { useMemo } from "react";
import { createEditor, Descendant, Text } from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";
import { Transforms, Editor } from "slate";
import { FaBold, FaItalic, FaUnderline, FaCode } from "react-icons/fa";
import { BaseElement } from "slate";
interface RichTextProps {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
}

// Define a custom text type with optional formatting

// Define CustomText with specific properties
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  fontSize?: string;
};

// Define a CustomElement
export interface CustomElement extends BaseElement {
  type: "paragraph" | "heading" | "code-block";
  children: CustomText[]; // A CustomElement contains an array of CustomText
}

// Union type for all Slate nodes
export type SlateNode = CustomElement | CustomText;
// Extend Slate's Node type for better type inference
declare module "slate" {
  interface CustomTypes {
    Text: CustomText;
  }
}

// Toolbar Button Component
const ToolbarButton: React.FC<{
  format: keyof CustomText;
  icon: React.ReactNode;
}> = ({ format, icon }) => {
  const editor = useSlate();
  const isActive = isFormatActive(editor, format);

  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        toggleFormat(editor, format);
      }}
      className={`p-2 ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
      } rounded`}
    >
      {icon}
    </button>
  );
};

const FontSizeButton: React.FC = () => {
  const editor = useSlate();

  const increaseFontSize = () => {
    const [match] = Editor.nodes<CustomText>(editor, {
      match: Text.isText,
      universal: true,
    });

    const currentFontSize = match?.[0]?.fontSize || "18px";
    const newFontSize = `${parseInt(currentFontSize) + 2}px`;

    Transforms.setNodes<CustomText>(
      editor,
      { fontSize: newFontSize },
      { match: Text.isText, split: true }
    );
  };

  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        increaseFontSize();
      }}
      className="p-2 bg-gray-200 font-DMSans font-bold text-gray-800 rounded"
    >
      A+
    </button>
  );
};

// Toggle formatting
const toggleFormat = (editor: Editor, format: keyof CustomText) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes<CustomText>(
    editor,
    { [format]: isActive ? undefined : true },
    { match: Text.isText, split: true }
  );
};

// Check if a format is active
const isFormatActive = (editor: Editor, format: keyof CustomText) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => Text.isText(n) && n[format] === true,
    universal: true,
  });
  return !!match;
};

// Render Leaf for text formatting
const renderLeaf = (props: any) => {
  const { attributes, children, leaf } = props;

  let formattedChildren = children;

  if (leaf.bold) {
    formattedChildren = <strong>{formattedChildren}</strong>;
  }

  if (leaf.italic) {
    formattedChildren = <em>{formattedChildren}</em>;
  }

  if (leaf.underline) {
    formattedChildren = <u>{formattedChildren}</u>;
  }

  if (leaf.code) {
    formattedChildren = (
      <code className="bg-gray-100 p-1 rounded">{formattedChildren}</code>
    );
  }

  return (
    <span
      {...attributes}
      style={{ fontSize: leaf.fontSize || "14px" }} // Apply font size
    >
      {formattedChildren}
    </span>
  );
};

const RichText: React.FC<RichTextProps> = ({ value, onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <div>
      <Slate editor={editor} initialValue={value} onChange={onChange}>
        <div className="flex space-x-2 mb-2">
          <ToolbarButton format="bold" icon={<FaBold />} />
          <ToolbarButton format="italic" icon={<FaItalic />} />
          <ToolbarButton format="underline" icon={<FaUnderline />} />
          <ToolbarButton format="code" icon={<FaCode />} />
          <FontSizeButton />
        </div>
        <Editable
          placeholder="Enter some text..."
          className="p-4 h-[134px] text-[#333] text-[18px] border-[0.5px] border-[#ddd] rounded-md mb-2"
          renderLeaf={renderLeaf}
        />
      </Slate>
    </div>
  );
};

export default RichText;
