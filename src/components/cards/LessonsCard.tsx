type LessonsCardProp = {
  image: string;
  title: string;
};
const LessonsCard = ({ image, title }: LessonsCardProp) => {
  return (
    <div className="flex justify-start border-y-[1px] py-4 border-y-[#ddd] gap-4 items-start">
      <div>
        <img src={image} alt="" className="w-[129px] h-[97.97px] rounded-md" />
      </div>
      <div className="flex flex-col justify-between items-start h-[97.97px]">
        <p className="text-[15px] font-DMSans font-semibold w-full lg:w-[304px]">
          {title}
        </p>
        <p className="text-[15px] font-DMSans font-semibold w-full">
          Bonus: 3 Quiz: 12 Assignment: 5 Capstone: 15{" "}
        </p>
      </div>
    </div>
  );
};

export default LessonsCard;
