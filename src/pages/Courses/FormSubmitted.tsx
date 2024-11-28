import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/components/constants/routes";
import Header from "~/components/students/Header";

const FormSubmitted = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="h-[100vh]">
      <Header />
      <div className="w-full flex justify-center items-center">
        <div className="w-full lg:w-[1485px] flex justify-end items-center p-4 lg:p-10">
          <div className="w-full lg:w-[746px] flex flex-col justify-between items-start p-4 lg:p-10 h-[376px] border-[1px] border-[#FF5050]">
            <h2 className="text-[33px] font-DMSans font-semibold text-left w-full lg:w-[487px]">
              Your Application is Successfully submitted{" "}
            </h2>
            <p className="text-[21px] font-DMSans font-normal text-left w-full lg:w-[561px]">
              We will review your application and get back to you within 72
              hours hours. Please login to see your application status.
            </p>

            <button
              onClick={handleNavigate}
              className="text-[18px] text-[#3D0EFE] font-DMSans font-semibold text-left w-full uppercase"
            >
              Login to account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSubmitted;
