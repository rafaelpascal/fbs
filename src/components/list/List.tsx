import { GoDotFill } from "react-icons/go";
import RichText from "./RichText";
import DOMPurify from "dompurify";
import { cn } from "~/utils/helpers";

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
  const ListTag = ordered ? "ol" : "ul";
  console.log(ordered);

  return (
    <div>
      <h2
        className={cn(
          "text-[23px] font-DMSans font-semibold",
          title === "Who is this course for ?" ? "mt-8" : "",
          title === "Career Options & Opportunities" ? "mt-8" : ""
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
            {!ordered && <GoDotFill className="mt-1" />}
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
