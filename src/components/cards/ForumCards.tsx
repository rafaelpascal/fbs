import { Link } from "react-router-dom";
import { Avatar } from "../dashboard/Avatar";

type ForumCardProps = {
  id: number;
  avatarImg: string;
  avatarName: string;
  authorName: string;
  postDate: string;
  postTitle: string;
  postMeta: string;
};

const ForumCards = ({
  id,
  avatarImg,
  avatarName,
  authorName,
  postDate,
  postTitle,
  postMeta,
}: ForumCardProps) => {
  return (
    <Link
      to={`/Forum/${id}`}
      className="border hover:border-[#FF1D09B2] flex justify-start items-start gap-4 border-[#B3B3B3] rounded-2xl shadow-lg p-6"
    >
      <Avatar
        img={avatarImg}
        name={avatarName}
        avatarClassName="md:h-[69.1px] h-20 w-20 md:w-[69.1px] bg-[#F01E00] rounded-full"
        textClassName="font-medium text-white text-sm"
        wrapperClassName="max-md:gap-0"
        color={"#fff"}
      />
      <div className="flex flex-col space-y-1 items-start justify-start">
        <h2 className="font-DMSans text-lg text-[#FF1D09B2] font-semibold text-left">
          {authorName}
        </h2>
        <p className="font-DMSans text-sm font-semibold text-left">
          {postDate}
        </p>
        <h2 className="font-DMSans w-full lg:w-[80%] text-2xl font-semibold text-left">
          {postTitle}
        </h2>
        <p className="font-DMSans text-[#7F7F7F] text-sm font-normal text-left">
          {postMeta}
        </p>
      </div>
    </Link>
  );
};

export default ForumCards;
