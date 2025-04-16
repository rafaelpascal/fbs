import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormPayload, authSchema } from "./schema";
import { Link, useNavigate } from "react-router-dom";
import { BaseInput } from "~/components/data-inputs/text-input";
import { Validator } from "~/utils/packages/validators";
import { BaseButton } from "~/components/buttons/BaseButton";
import { ROUTES } from "~/components/constants/routes";
import { AuthService } from "~/api/auth";
import { showAlert } from "~/utils/sweetAlert";
import { setUser } from "~/redux-store/slice/user.Slice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

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
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved email if "Remember Me" was previously selected
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      form.setValue("email", storedEmail);
      setRememberMe(true);
    }
  }, []);

  const form = useForm<AuthFormPayload>({
    resolver: zodResolver(authSchema),
    mode: "onChange",
  });
  const { unWrapErrors } = Validator.reactHookHandler(form.formState);

  // Handle Login and MFA pop up
  const handleLogin = form.handleSubmit(async (data: AuthFormPayload) => {
    try {
      const res = await AuthService.login(data);
      if (res.userData.success === false) {
        await showAlert(
          "error",
          "Login failed!",
          res.userData.message,
          "Ok",
          "#ED342B"
        );
        form.reset();
        return;
      }
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      if (res?.userData?.profile?.[0].user_role === 1) {
        dispatch(
          setUser({
            userid: res?.userData?.profile[0]?.userid,
            firstname: res?.userData?.profile[0]?.firstname,
            lastname: res?.userData?.profile[0]?.lastname,
            email: res?.userData?.profile[0]?.email,
            role: res?.userData?.profile[0]?.user_role,
          })
        );
        navigate(ROUTES.ADMINDASHBOARD);
      } else {
        dispatch(
          setUser({
            userid: res?.userData?.profile[0]?.userid,
            firstname: res?.userData?.profile[0]?.firstname,
            lastname: res?.userData?.profile[0]?.lastname,
            email: res?.userData?.profile[0]?.email,
            role: res?.userData?.profile[0]?.user_role,
          })
        );
        navigate(ROUTES.DASHBOARD);
      }
      form.reset();
    } catch (error) {
      form.reset();
      console.log(error);
    }
  });

  return (
    <div className="w-full lg:absolute lg:right-[60%] lg:top-[18%] lg:w-[598px] flex justify-between items-center flex-col bg-[#fff] shadow-xl rounded-[16px] p-4 lg:p-10">
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
      <div className="flex justify-between items-center w-full mt-4">
        <div className="flex justify-start items-center gap-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="checkbox checkbox-error"
          />
          <p className="text-[16px] text-[#4F547B] font-DMSans font-normal">
            Remember me
          </p>
        </div>

        <Link
          to={"/forgot-password"}
          className="text-[16px] text-[#6440FB] underline font-DMSans font-normal"
        >
          Forgot Password?
        </Link>
      </div>
      <BaseButton
        containerCLassName={`mt-4 h-[40px] w-full rounded-[8px] bg-[#FF3B30] text-[16px] font-bold font-DMSans text-[#fff] ${
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
      <div className="flex flex-col lg:flex-row w-full justify-start items-center my-4 gap-2">
        <p className="text-[14px] text-[#4F547B] font-DMSans font-normal">
          Don’t have an account yet?
        </p>
        <Link
          to="https://fordaxbschool.com/execs"
          className="text-[#F01E00B2] ext-[14px] font-DMSans font-normal"
        >
          Select a program and apply
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
