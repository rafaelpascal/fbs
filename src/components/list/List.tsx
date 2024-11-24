import { GoDotFill } from "react-icons/go";

type FacilitatorsProps = {
  title: string;
  items: string[];
  ordered: boolean;
  customClass: string;
};

const List = ({ title, items, ordered, customClass }: FacilitatorsProps) => {
  // Choose the list type based on the `ordered` prop
  const ListTag = ordered ? "ol" : "ul";

  return (
    <div>
      <h2 className="text-[20px] font-DMSans font-semibold mb-4">{title}</h2>
      <ListTag className={`${customClass}`}>
        {items.map((item, index) => (
          <li
            key={index}
            className="flex justify-start items-center gap-4 py-2"
          >
            <GoDotFill />
            <p>{item}</p>
          </li>
        ))}
      </ListTag>
    </div>
  );
};

export default List;
