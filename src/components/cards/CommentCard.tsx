import React from "react";
import { Avatar } from "../dashboard/Avatar";

interface CommentProps {
  author: string;
  replyTo: string;
  content: string;
}

const CommentCard: React.FC<CommentProps> = ({ author, replyTo, content }) => {
  return (
    <div className="lg:ml-6 border-l pl-4">
      <p className="text-sm text-gray-500 mb-1">
        Replied to <span className="font-semibold">{replyTo}</span>
      </p>
      <div className="flex items-start gap-3">
        <Avatar
          img=""
          name={author}
          avatarClassName="md:h-10 h-10 w-10 md:w-10 bg-[#336CFB] rounded-full"
          textClassName="font-medium text-white text-sm"
          wrapperClassName="max-md:gap-0"
          color={"#fff"}
        />
        <div>
          <p className="text-sm font-medium font-DMSans text-[#336CFB]">
            {author}
          </p>
          <p className="text-xs font-DMSans italic font-semibold">
            3 minutes ago
          </p>
          <p className="mt-1 text-lg font-DMSans font-normal text-left">
            {content}
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-1">
            <button className="font-DMSans text-sm font-semibold text-left">
              Like
            </button>
            <button className="font-DMSans text-sm font-semibold text-left">
              Reply
            </button>
            <button className="font-DMSans text-sm font-semibold text-left">
              Edit
            </button>
            <button className="font-DMSans text-sm font-semibold text-left">
              Delete
            </button>
            <button className="text-red-500 font-DMSans text-sm font-semibold text-left">
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
