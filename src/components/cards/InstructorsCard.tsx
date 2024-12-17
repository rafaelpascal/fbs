import { Avatar } from "../dashboard/Avatar";
import { BiMessageSquareDots } from "react-icons/bi";
import { FaUserGraduate } from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";

type InstructorsCardProps = {
  img?: string;
  name: string;
  Reviews: string;
  Students: string;
  Courses: string;
};

const InstructorsCard = ({
  img,
  name,
  Reviews,
  Students,
  Courses,
}: InstructorsCardProps) => {
  return (
    <div className="flex my-2 hover:shadow-lg p-2 rounded-lg justify-between items-start">
      <Avatar
        img={img}
        name={name}
        avatarClassName="md:h-14 rounded-full h-8 w-8 md:w-14"
        textClassName="font-normal text-sm"
        wrapperClassName="max-md:gap-0"
      ></Avatar>
      <div className="w-[80%]">
        <h2 className="font-DMSans mb-2 font-semibold text-[15px]">{name}</h2>
        <div className="flex flex-row justify-between items-center">
          <div className="flex justify-start items-start gap-2">
            <BiMessageSquareDots className="text-[20px]" />
            <div>
              <p className="font-DMSans font-semibold text-[13px]">{Reviews}</p>
              <p className="font-DMSans font-semibold text-[13px]">Reviews</p>
            </div>
          </div>
          <div className="flex justify-start items-start gap-2">
            <FaUserGraduate className="text-[20px]" />
            <div>
              <p className="font-DMSans font-semibold text-[13px]">
                {Students}
              </p>
              <p className="font-DMSans font-semibold text-[13px]">Students</p>
            </div>
          </div>
          <div className="flex justify-start items-start gap-2">
            <CiPlay1 className="text-[20px]" />
            <div>
              <p className="font-DMSans font-semibold text-[13px]">{Courses}</p>
              <p className="font-DMSans font-semibold text-[13px]">Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorsCard;
