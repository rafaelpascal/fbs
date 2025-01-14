import Slider from "react-slick";
import { IoIosStar } from "react-icons/io";
import { Avatar } from "~/components/dashboard/Avatar";

type Facilitator = {
  name: string;
  position: string;
  rating: number;
  description: string;
  image: string;
};
type FacilitatorsProps = {
  facilitatorsData: Facilitator[];
};
const Facilitators = ({ facilitatorsData }: FacilitatorsProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {facilitatorsData.map((facilitator, index) => (
        <div key={index} className="p-4">
          <div className="flex justify-start flex-col lg:flex-row items-start lg:items-center gap-4">
            <Avatar
              img={facilitator.image}
              name={facilitator.name}
              avatarClassName="md:h-[130.2px] rounded-[4px]  h-[130.2px] w-[135.37px] md:w-[130.2px] bg-[#FF3B30]"
              textClassName="font-normal text-sm"
              wrapperClassName="max-md:gap-0"
              color="fff"
            ></Avatar>
            <div className="w-full lg:w-[283px]">
              <h2 className="text-[22px] font-semibold font-DMSans">
                {facilitator.name}
              </h2>
              <p className="text-[16px] font-normal font-DMSans">
                {facilitator.position}
              </p>
              <div className="flex mt-3 justify-start items-center gap-2">
                <IoIosStar className="text-[16px] text-[#E59819] font-DMSans" />
                <p className="text-[16px] text-[#E59819] font-DMSans">
                  {facilitator.rating}
                </p>
                <p className="text-[16px] font-DMSans">Instructor Rating</p>
              </div>
            </div>
          </div>
          <p className="my-4 text-[20px]">{facilitator.description}</p>
        </div>
      ))}
    </Slider>
  );
};

export default Facilitators;
