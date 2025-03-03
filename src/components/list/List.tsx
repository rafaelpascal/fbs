import { GoDotFill } from "react-icons/go";
import RichText from "./RichText";
import DOMPurify from "dompurify";

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

  return (
    <div>
      <h2 className="text-[20px] font-DMSans font-semibold">{title}</h2>
      <ListTag className={`${customClass}`}>
        {items.map((item, index) => (
          <li
            key={index}
            className="flex text-left text-[16px] items-start font-DMSans gap-4"
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
