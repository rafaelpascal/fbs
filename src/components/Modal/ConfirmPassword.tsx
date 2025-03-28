import { BaseModal } from "./BaseModal";
import { MdCancel } from "react-icons/md";
import { BaseInput } from "../data-inputs/text-input";
import { AuthFormPayload, authSchema } from "~/feature/students/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Validator } from "~/utils/packages/validators";
import { BaseButton } from "../buttons/BaseButton";
import { showAlert } from "~/utils/sweetAlert";
import { AuthService } from "~/api/auth";
import { useSelector } from "react-redux";
import { RootState } from "~/redux-store/store";
import { useEffect } from "react";

interface IModalPropsType {
  isOpen: boolean;
  //   message?: string;
  closeModal: () => void;
  handleSuccess: () => void;
}

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

export const ConfirmPassword = ({
  isOpen,
  closeModal,
  handleSuccess,
}: IModalPropsType) => {
  const user = useSelector((state: RootState) => state.user);
  const form = useForm<AuthFormPayload>({
    resolver: zodResolver(authSchema),
    mode: "onChange",
    defaultValues: {
      email: "", // Start empty, we will set it later
      password: "",
    },
  });

  const { unWrapErrors } = Validator.reactHookHandler(form.formState);

  // Update form when user.email is available
  useEffect(() => {
    if (user.email) {
      form.reset({
        email: user.email,
        password: "", // Reset password field
      });
    }
  }, [user.email, form]);

  const handleLogin = form.handleSubmit(async (data: AuthFormPayload) => {
    try {
      const res = await AuthService.login(data);
      if (res.userData.success === false) {
        closeModal();
        showAlert(
          "error",
          "Login failed!",
          res.userData.message,
          "Ok",
          "#ED342B"
        );
        form.reset();
        return;
      } else {
        closeModal();
        await showAlert(
          "success",
          "Verified!",
          "Continue with your Application.",
          "Ok",
          "#03435F"
        );
        handleSuccess();
        form.reset();
      }
    } catch (error) {
      closeModal();
      form.reset();
      console.log(error);
    }
  });

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:min-w-[546px]"
    >
      <div className="relative flex w-full p-6 h-[500px] flex-col items-start justify-start">
        <div className="w-full mb-4 flex justify-between items-start">
          <div>
            <h2 className="text-[33px] mb-4 font-bold font-DMSans">
              Confirm account!
            </h2>
            <p className="text-[17px] mb-4 font-normal font-DMSans">
              Log in to confirm this account belongs to you.
            </p>
          </div>
          <button onClick={closeModal}>
            <MdCancel className="text-[30px] text-[#FF1515]" />
          </button>
        </div>
        <div className="w-full mt-4 flex flex-col justify-start items-start">
          {fields.map((field) => (
            <BaseInput
              key={field.name}
              {...field}
              labelClassName="text-[#140342] mt-4 text-[18px] font-bold font-DMSans"
              containerClassname="w-full"
              {...form.register(field.name)}
              error={unWrapErrors(field.name)}
              disabled={field.name === "email"} // Disable email input
            />
          ))}
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
      </div>
    </BaseModal>
  );
};
