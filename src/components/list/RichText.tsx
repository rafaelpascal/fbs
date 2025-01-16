type RichTextProps = {
  content: string;
};

const RichText = ({ content }: RichTextProps) => {
  return (
    <div>
      <div
        className="rich-text-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default RichText;
