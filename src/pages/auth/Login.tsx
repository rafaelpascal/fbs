import { FBSlogo, loginprogress } from "~/assets";
import LoginForm from "../../feature/students/login-form";

const Login = () => {
  return (
    <div className="bg-black flex flex-col lg:flex-row justify-between items-center lg:h-[100vh]">
      <div className="w-full lg:w-[70%] gap-10 p-4 lg:pl-[5%] bg-[#fff] h-full">
        <img src={FBSlogo} alt="FBSlogo" className="py-4" />
        <div className="w-full lg:w-[526px] flex flex-col h-[70%] justify-center items-start">
          <h2 className="text-[26px] lg:text-[45px] font-bold font-DMSans text-[#F01E00] lg:leading-[54.46px]">
            Sign into your student account
          </h2>
          <p className="text-[18px] lg:text-[26px] font-normal font-DMSans text-[#575757] lg:leading-[33.85px] my-6">
            …gain the skills and perspective needed to secure more senior roles,
            and the confidence and connections to join or start a new company… 
          </p>
          <img src={loginprogress} alt="loginprogress" />
        </div>
      </div>
      <div className="w-full lg:w-[30%] p-2 relative bg-[#F01E00] h-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
