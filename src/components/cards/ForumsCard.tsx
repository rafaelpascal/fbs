type ForumsCardProp = {
  image: string;
  title: string;
};
const ForumsCard = ({ image, title }: ForumsCardProp) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between border-y-[1px] py-4 border-y-[#ddd] gap-4 items-start">
      <div className="flex justify-start items-center gap-4">
        <div>
          <img
            src={image}
            alt=""
            className="w-[129px] h-[97.97px] rounded-md"
          />
        </div>
        <div className="flex flex-col justify-between items-start h-[97.97px]">
          <p className="text-[#140342] text-[15px] font-DMSans font-semibold w-full lg:w-[304px]">
            {title}
          </p>
          <p className="text-[#4F547B] text-[15px] font-DMSans font-semibold w-full">
            Uchenna Joe
          </p>
        </div>
      </div>
      <div className="w-full lg:w-[20%] flex flex-col justify-between items-start h-[97.97px]">
        <div className="flex justify-between w-full items-center">
          <div>
            <h2 className="text-[#4F547B] text-[22px] font-DMSans font-semibold w-full">
              85
            </h2>
            <p className="text-[#4F547B] text-[13px] font-DMSans font-semibold w-full">
              Views
            </p>
          </div>
          <div>
            <h2 className="text-[#4F547B] text-[22px] font-DMSans font-semibold w-full">
              85
            </h2>
            <p className="text-[#4F547B] text-[13px] font-DMSans font-semibold w-full">
              Views
            </p>
          </div>
          <div>
            <h2 className="text-[#4F547B] text-[22px] font-DMSans font-semibold w-full">
              85
            </h2>
            <p className="text-[#4F547B] text-[13px] font-DMSans font-semibold w-full">
              Views
            </p>
          </div>
        </div>
        <button className="text-[16px] font-DMSans font-semibold text-[#F01E00]">
          Add Reply
        </button>
      </div>
    </div>
  );
};

export default ForumsCard;
