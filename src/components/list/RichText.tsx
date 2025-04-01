import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";

type RichTextProps = {
  content: string;
};

const RichText = ({ content }: RichTextProps) => {
  const { theme } = useTheme();
  const updatedContent = content.replace(
    /color:\s*rgb\(0,\s*0,\s*0\)/g,
    theme === "dark" ? "color: white" : "color: black"
  );
  return (
    <div>
      <div
        className={cn(
          "prose",
          theme === "dark"
            ? "rich-text-content-dark"
            : "rich-text-content-light"
        )}
        dangerouslySetInnerHTML={{ __html: updatedContent }}
      />
    </div>
  );
};

export default RichText;
