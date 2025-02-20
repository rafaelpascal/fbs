import { FBSlogo } from "~/assets";
import Slider from "react-slick";
import { useState } from "react";
import ChangePasswordForm from "../../feature/students/ChangePassword";

const autoplaySpeed = 3000;

const ChangePasswordpage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoplaySpeed,
    arrows: false,
    adaptiveHeight: false,
    lazyLoad: "ondemand" as "ondemand",
    afterChange: (current: any) => {
      setActiveSlide(current);
    },
  };
  return (
    <div className="bg-black flex flex-col flex-wrap lg:flex-row justify-between items-center lg:h-[100vh]">
      <div className="w-full lg:w-[70%] gap-10 p-4 lg:pl-[5%] bg-[#fff] h-full">
        <img src={FBSlogo} alt="FBSlogo" className="py-4" />
        <div className="w-full lg:w-[526px] flex flex-col h-[70%] justify-center items-start">
          <h2 className="text-[26px] lg:text-[45px] font-bold font-DMSans text-[#F01E00] lg:leading-[54.46px]">
            Change Password
          </h2>
          <div className="w-full">
            <Slider {...settings}>
              <div>
                <p className="text-[18px] lg:text-[26px] font-normal font-DMSans text-[#575757] lg:leading-[33.85px] my-6">
                  Explore cutting-edge business strategies and tools designed to
                  help you thrive in today’s fast-paced, competitive landscape.
                </p>
              </div>
              <div>
                <p className="text-[18px] lg:text-[26px] font-normal font-DMSans text-[#575757] lg:leading-[33.85px] my-6">
                  Transform your career with practical skills, innovative
                  thinking, and a network of industry leaders ready to support
                  your journey.
                </p>
              </div>
              <div>
                <p className="text-[18px] lg:text-[26px] font-normal font-DMSans text-[#575757] lg:leading-[33.85px] my-6">
                  Gain a competitive edge with a curriculum that combines
                  leadership, innovation, and digital transformation expertise.
                </p>
              </div>
            </Slider>
          </div>
          {activeSlide === 0 && (
            <div className="flex justify-start items-center gap-2">
              <div className="w-[34px] h-[8px] rounded-[12px] bg-[#FF1515]"></div>
              <div className="w-[8px] h-[8px] rounded-full bg-[#FF1515]"></div>
              <div className="w-[8px] h-[8px] rounded-full bg-[#FF1515]"></div>
            </div>
          )}
          {activeSlide === 1 && (
            <div className="flex justify-start items-center gap-2">
              <div className="w-[8px] h-[8px] rounded-full bg-[#FF1515]"></div>
              <div className="w-[34px] h-[8px] rounded-[12px] bg-[#FF1515]"></div>
              <div className="w-[8px] h-[8px] rounded-full bg-[#FF1515]"></div>
            </div>
          )}
          {activeSlide === 2 && (
            <div className="flex justify-start items-center gap-2">
              <div className="w-[8px] h-[8px] rounded-full bg-[#FF1515]"></div>
              <div className="w-[8px] h-[8px] rounded-full bg-[#FF1515]"></div>
              <div className="w-[34px] h-[8px] rounded-[12px] bg-[#FF1515]"></div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full lg:w-[30%] shadow-md p-2 relative bg-[#F01E00] h-full">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePasswordpage;
