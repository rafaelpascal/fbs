import React, { useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill>(null);

  // Toolbar configuration (optional)
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"],
      [{ align: [] }],
      ["blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      ["image", "video"],
      ["clean"],
    ],
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        modules={modules}
        theme="snow"
        placeholder="Start typing here..."
      />
    </div>
  );
};

export default RichTextEditor;
