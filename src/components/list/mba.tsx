import { GoDotFill } from "react-icons/go";

type FacilitatorsProps = {
  items: string[];
  ordered: boolean;
  customClass: string;
};

const MbaList = ({ items, ordered, customClass }: FacilitatorsProps) => {
  // Choose the list type based on the `ordered` prop
  const ListTag = ordered ? "ol" : "ul";

  return (
    <div>
      <ListTag className={`${customClass}`}>
        {items.map((item, index) => (
          <li
            key={index}
            className="flex justify-start border-b border-[#ddd] px-6 items-center gap-4 py-2"
          >
            <GoDotFill />
            <p>{item}</p>
          </li>
        ))}
      </ListTag>
    </div>
  );
};

export default MbaList;
