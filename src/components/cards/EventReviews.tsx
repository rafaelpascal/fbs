import { Avatar } from "../dashboard/Avatar";
import { HiOutlineHandThumbDown, HiOutlineHandThumbUp } from "react-icons/hi2";

type EventReviewProps = {
  img: string;
  name: string;
  time: string;
  title: string;
  comment: string;
};

const EventReviews = ({
  img,
  name,
  time,
  title,
  comment,
}: EventReviewProps) => {
  return (
    <div className="flex justify-between items-center flex-col lg:flex-row">
      <div className="mb-4 lg:mb-0">
        <Avatar
          img={img}
          name={name}
          avatarClassName="md:h-30 rounded-full h-20 w-20 md:w-30 bg-[#FF3B30]"
          textClassName="font-normal text-sm"
          wrapperClassName="max-md:gap-0"
          color="fff"
        ></Avatar>
      </div>
      <div className="w-full p-6 rounded-md">
        <div className="flex justify-start items-center gap-2">
          <h2 className="text-[17px] font-DMSans font-semibold text-left">
            {name}
          </h2>
          <p className="text-[13px] font-DMSans font-normal text-left">
            {time}
          </p>
        </div>
        <div className="rating rating-xs">
          <input
            type="radio"
            disabled
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-5"
            disabled
            className="mask mask-star-2 bg-orange-400"
            defaultChecked
          />
          <input
            type="radio"
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
          />
        </div>
        <h2 className="text-[17px] mb-4 font-DMSans font-semibold text-left">
          {title}
        </h2>
        <p className="text-[15px] text-left mb-2 font-DMSans font-normal">
          {comment}
        </p>
        <div className="flex justify-start items-center gap-4">
          <p className="text-[#FF3B30] text-[15px] text-left font-DMSans font-normal">
            Was this review helpful?
          </p>
          <div className="flex justify-end items-center">
            <button>
              <HiOutlineHandThumbUp className="hover:text-[#FF1515] text-[32px]" />
            </button>
            <button>
              <HiOutlineHandThumbDown className="hover:text-[#FF1515] text-[32px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventReviews;
