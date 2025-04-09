import { GoDotFill } from "react-icons/go";
import RichText from "./RichText";
import DOMPurify from "dompurify";
import { cn } from "~/utils/helpers";
import { useTheme } from "~/context/theme-provider";

type FacilitatorsProps = {
  title: string;
  items: string[];
  ordered?: boolean;
  customClass?: string;
};

const List = ({
  title,
  items,
  ordered = false,
  customClass = "",
}: FacilitatorsProps) => {
  const { theme } = useTheme();
  const ListTag = ordered ? "ol" : "ul";

  return (
    <div>
      <h2
        className={cn(
          "text-[23px] font-DMSans font-semibold",
          title === "Who is this course for ?" ? "mt-8" : "",
          title === "Career Options & Opportunities" ? "mt-8" : "",
          title === "Assessment Methods" ? "mt-8" : ""
        )}
      >
        {title}
      </h2>
      <ListTag className={`${customClass}`}>
        {items.map((item, index) => (
          <li
            key={index}
            className="flex text-left text-[19px] items-start font-DMSans gap-4"
          >
            {!ordered && (
              <GoDotFill
                className={cn(
                  "mt-1 text-[#FF3B30] text-[20px]",
                  theme === "dark" ? "text-[#fff]" : "text-[#000]"
                )}
              />
            )}
            <div className="flex-1">
              {/* Use RichText for advanced rendering or sanitize directly */}
              <RichText content={DOMPurify.sanitize(item)} />
            </div>
          </li>
        ))}
      </ListTag>
    </div>
  );
};

export default List;
