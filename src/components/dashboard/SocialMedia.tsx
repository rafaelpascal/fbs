import {
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <button className="w-[45px] flex justify-center items-center h-[45px] rounded-full hover:bg-[#EEF2F6]">
        <FaFacebookF />
      </button>
      <button className="w-[45px] flex justify-center items-center h-[45px] rounded-full hover:bg-[#EEF2F6]">
        <FaTwitter />
      </button>
      <button className="w-[45px] flex justify-center items-center h-[45px] rounded-full hover:bg-[#EEF2F6]">
        <FaInstagramSquare />
      </button>
      <button className="w-[45px] flex justify-center items-center h-[45px] rounded-full hover:bg-[#EEF2F6]">
        <FaLinkedin />
      </button>
    </div>
  );
};

export default SocialMedia;
