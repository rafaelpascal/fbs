import { Avatar } from "../dashboard/Avatar";

type CourseListCardProps = {
  instructoravatar?: string;
  title: string;
  img: string;
  instructorname: string;
  lesson: string;
  duration: string;
};
const CourseListCard = ({
  // instructoravatar,
  title,
  img,
  instructorname,
  lesson,
  duration,
}: CourseListCardProps) => {
  return (
    <div className="flex flex-wrap w-full my-2 hover:shadow-lg p-2 rounded-lg justify-between items-start">
      <div className="w-[30%]">
        <img
          src={img}
          alt=""
          className="w-[91px] h-[86px] object-cover rounded-md"
        />
      </div>
      <div className="w-[70%]">
        <h2 className="font-DMSans font-semibold text-[15px]">{title}</h2>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <Avatar
              img=""
              name={instructorname || ""}
              avatarClassName="md:h-8 rounded-full h-8 w-8 md:w-8"
              textClassName="font-normal text-sm"
              wrapperClassName="max-md:gap-0"
            ></Avatar>
            <h2>{instructorname}</h2>
          </div>
          <div>
            <h2 className="font-DMSans font-normal text-[14px]">
              {lesson} lesson
            </h2>
          </div>
          <div>
            <h2 className="font-DMSans font-normal text-[14px]">{duration}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseListCard;
