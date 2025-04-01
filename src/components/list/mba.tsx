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
            className="flex justify-between border-b border-[#ddd] px-6 items-center w-full py-2"
          >
            {item.count === undefined || item.count === "" ? (
              <div className="flex w-full justify-start items-center gap-4">
                <p className="text-[18px] font-DMSans font-semibold">
                  {item.icon}
                </p>
                <p className="text-[18px] text-right font-DMSans font-semibold">
                  {item.text}
                </p>
              </div>
            ) : (
              <>
                <div className="flex w-[70%] justify-start items-center gap-4">
                  <p className="text-[18px] font-DMSans font-semibold">
                    {item.icon}
                  </p>
                  <p className="text-[18px] text-right font-DMSans font-semibold">
                    {item.text}
                  </p>
                </div>
                <p className="text-[18px] w-[30%] text-right font-DMSans font-semibold">
                  {item.count}
                </p>
              </>
            )}
          </li>
        ))}
      </ListTag>
    </div>
  );
};

export default MbaList;
