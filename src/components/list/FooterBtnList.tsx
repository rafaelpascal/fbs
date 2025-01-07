type FacilitatorsProps = {
  title: string;
  items: string[];
  ordered: boolean;
  customClass: string;
};

const FooterBtnList = ({
  title,
  items,
  ordered,
  customClass,
}: FacilitatorsProps) => {
  // Choose the list type based on the `ordered` prop
  const ListTag = ordered ? "ol" : "ul";

  return (
    <div className="">
      <h2 className="text-[17px] my-4 lg:mb-10 text-white text-center lg:text-left w-full font-DMSans font-semibold">
        {title}
      </h2>
      <ListTag className={`${customClass}`}>
        {items.map((item, index) => (
          <li
            key={index}
            className="flex justify-center lg:justify-start  text-white items-center gap-4 py-2 lg:py-4"
          >
            <button className="text-[15px] font-DMSans font-semibold">
              {item}
            </button>
          </li>
        ))}
      </ListTag>
    </div>
  );
};

export default FooterBtnList;
