import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordPayload, forgotSchema } from "./schema";
import { Link, useNavigate } from "react-router-dom";
import { BaseInput } from "~/components/data-inputs/text-input";
import { Validator } from "~/utils/packages/validators";
import { BaseButton } from "~/components/buttons/BaseButton";
import { ROUTES } from "~/components/constants/routes";
import { AuthService } from "~/api/auth";
import { showAlert } from "~/utils/sweetAlert";

const fields = [
  {
    name: "email_address" as const,
    placeholder: "Enter Email",
    label: "Email Address",
    type: "email",
  },
];

// Login form
const Forgotpassword = () => {
  const navigate = useNavigate();
  const form = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(forgotSchema),
    mode: "onChange",
  });
  const { unWrapErrors } = Validator.reactHookHandler(form.formState);

  // Handle Login and MFA pop up
  const handleLogin = form.handleSubmit(async (data: ForgotPasswordPayload) => {
    try {
      const res = await AuthService.forgotpassword(data);
      if (res.data.success === false) {
        await showAlert("error", "Failed!", res.data.message, "Ok", "#ED342B");
        form.reset();
        return;
      } else {
        await showAlert(
          "success",
          "Link sent!",
          res.data.message,
          "Ok",
          "#03435F"
        );
        navigate(ROUTES.HOME);
      }
      form.reset();
    } catch (error) {
      form.reset();
    }
  });

  return (
    <div className="w-full lg:absolute lg:right-[60%] lg:top-[28%] lg:w-[598px] flex justify-between items-center flex-col bg-[#fff] shadow-xl rounded-[16px] p-4 lg:p-10">
      <h2 className="text-[24px] w-full text-left font-bold font-DMSans text-[#03435F]">
        Forgot Password
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
      <div className="flex justify-end items-center w-full mt-4">
        <p className="text-[16px] mr-4 text-[#4F547B] font-DMSans font-normal">
          Remember password?
        </p>
        <Link
          to={"/login"}
          className="text-[16px] text-[#6440FB] underline font-DMSans font-normal"
        >
          Login
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
        <p>Continue</p>
      </BaseButton>
    </div>
  );
};

export default Forgotpassword;
