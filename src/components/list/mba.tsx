type FooterItem = {
  text: string;
  icon: JSX.Element;
  count?: string | number;
};

type FacilitatorsProps = {
  items: FooterItem[];
  ordered: boolean;
  customClass: string;
};

const MbaList = ({ items, ordered, customClass }: FacilitatorsProps) => {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <div>
      <ListTag className={`${customClass}`}>
        {items.map((item, index) => (
          <li
            key={index}
            className="flex justify-between border-b border-[#ddd] px-6 items-center gap-4 py-2"
          >
            <div className="flex justify-start items-center gap-4">
              <p className="text-[20px] font-DMSans font-semibold">
                {item.icon}
              </p>
              <p className="text-[20px] font-DMSans font-semibold">
                {item.text}
              </p>
            </div>
            <p className="text-[20px] font-DMSans font-semibold">
              {item.count}
            </p>
          </li>
        ))}
      </ListTag>
    </div>
  );
};

export default MbaList;
