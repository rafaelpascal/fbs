import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormPayload, authSchema } from "./schema";
import { Link, useNavigate } from "react-router-dom";
import { BaseInput } from "~/components/data-inputs/text-input";
import { Validator } from "~/utils/packages/validators";
import { BaseButton } from "~/components/buttons/BaseButton";
import { ROUTES } from "~/components/constants/routes";
// import { useAuth } from "~/context/auth_provider";
// import { ROUTES } from "~/components/constants/routes";

const fields = [
  {
    name: "email" as const,
    placeholder: "Enter Email",
    label: "Email Address",
    type: "email",
  },
  {
    name: "password" as const,
    placeholder: "Enter Password",
    label: "Password",
    type: "password",
  },
];

// Login form
const LoginForm = () => {
  const navigate = useNavigate();
  //   const { login } = useAuth();
  const form = useForm<AuthFormPayload>({
    resolver: zodResolver(authSchema),
    mode: "onChange",
  });
  const { unWrapErrors } = Validator.reactHookHandler(form.formState);
  //   const navigate = useNavigate();

  // Handle Login and MFA pop up
  const handleLogin = form.handleSubmit(async (data: AuthFormPayload) => {
    navigate(ROUTES.DASHBOARD);
    console.log(data);
  });

  return (
    <div className="w-full lg:absolute lg:right-[60%] lg:top-[18%] lg:w-[598px] flex justify-between items-center flex-col bg-[#fff] border-[0.5px] border-[#757575] shadow-xl rounded-[16px] p-4 lg:p-10">
      <h2 className="text-[24px] w-full text-left font-bold font-DMSans text-[#03435F]">
        Login
      </h2>
      <div className="w-full mt-4 flex flex-col justify-start items-start">
        {fields.map((field) => (
          <BaseInput
            key={field.name}
            {...field}
            labelClassName="text-[#140342] mt-4 text-[18px] font-bold font-DMSans"
            containerClassname="w-full"
            {...form.register(field.name)}
            error={unWrapErrors(field.name)}
          />
        ))}
      </div>
      <div className="flex justify-between items-center w-full my-4">
        <div className="flex justify-start items-center gap-2">
          <input type="checkbox" name="" id="" />
          <p className="text-[14px] text-[#4F547B] font-DMSans font-normal">
            Remember me
          </p>
        </div>
        <Link
          to={"/forgot-password"}
          className="text-[14px] text-[#6440FB] underline font-DMSans font-normal"
        >
          Forgot Password?
        </Link>
      </div>
      <BaseButton
        containerCLassName={`mt-4 h-[66px] w-full rounded-[8px] bg-[#FF3B30] text-[16px] font-bold font-DMSans text-[#fff] ${
          !form.formState.isValid || form.formState.isSubmitting
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
        hoverScale={1.01}
        hoverOpacity={0.8}
        tapScale={0.9}
        onClick={handleLogin}
        disabled={!form.formState.isValid || form.formState.isSubmitting}
        loading={form.formState.isSubmitting}
      >
        <p>LOGIN TO ACCOUNT</p>
      </BaseButton>
      <div className="flex w-full justify-start items-center my-4 gap-2">
        <p className="text-[14px] text-[#4F547B] font-DMSans font-normal">
          Don't have an account yet?
        </p>
        <button className="text-[#F01E00B2] ext-[14px] font-DMSans font-normal">
          Sign up for free
        </button>
      </div>
    </div>
  );
};

export default LoginForm;