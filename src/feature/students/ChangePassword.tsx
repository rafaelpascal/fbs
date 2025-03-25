import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordPayload, changePasswordSchema } from "./schema";
import { useNavigate, useParams } from "react-router-dom";
import { BaseInput } from "~/components/data-inputs/text-input";
import { Validator } from "~/utils/packages/validators";
import { BaseButton } from "~/components/buttons/BaseButton";
import { ROUTES } from "~/components/constants/routes";
import { AuthService } from "~/api/auth";
import { showAlert } from "~/utils/sweetAlert";

const fields = [
  {
    name: "token" as const,
    placeholder: "",
    label: "Token",
    type: "hidden",
  },
  {
    name: "password" as const,
    placeholder: "Enter Password",
    label: "Password",
    type: "password",
  },
  {
    name: "cpassword" as const,
    placeholder: "Confirm Password",
    label: "Confirm password",
    type: "password",
  },
];

// Login form
const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const form = useForm<ChangePasswordPayload>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });
  const { unWrapErrors } = Validator.reactHookHandler(form.formState);

  // Handle Login and MFA pop up
  const handleLogin = form.handleSubmit(async (data: ChangePasswordPayload) => {
    try {
      const res = await AuthService.changepassword(data);
      if (res.data.success === true) {
        await showAlert(
          "success",
          "Successful!",
          res.data.message,
          "Ok",
          "#03435F"
        );
        navigate(ROUTES.HOME);
        form.reset();
        return;
      }
    } catch (error) {
      form.reset();
    }
  });

  return (
    <div className="w-full lg:absolute lg:right-[60%] lg:top-[28%] lg:w-[598px] flex justify-between items-center flex-col bg-[#fff] shadow-xl rounded-[16px] p-4 lg:p-10">
      <h2 className="text-[24px] w-full text-left font-bold font-DMSans text-[#03435F]">
        Change Password
      </h2>
      <div className="w-full mt-4 flex flex-col justify-start items-start">
        {fields.map((field) => {
          if (field.type === "hidden") {
            return (
              <input
                key={field.name}
                type="hidden"
                value={token}
                {...form.register(field.name)}
              />
            );
          }
          return (
            <BaseInput
              key={field.name}
              {...field}
              labelClassName="text-[#140342] mt-4 text-[18px] font-bold font-DMSans"
              containerClassname="w-full"
              {...form.register(field.name)}
              error={unWrapErrors(field.name)}
            />
          );
        })}
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
        <p>Proceed</p>
      </BaseButton>
    </div>
  );
};

export default ChangePasswordForm;
