import { useForm } from "react-hook-form";
import { BaseInput } from "~/components/data-inputs/text-input";
import { ApplicationFormPayload, applicationSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Validator } from "~/utils/packages/validators";
import OTPInput from "~/components/data-inputs/OTPInput";
import { BaseButton } from "~/components/buttons/BaseButton";
import { useState } from "react";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { FaAsterisk } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import { AuthService } from "~/api/auth";
import { showAlert } from "~/utils/sweetAlert";

const fields = [
  {
    name: "programmeid" as const,
    placeholder: "programmeid",
    label: "programmeid",
    value: `12`,
    type: "hidden",
  },
  {
    name: "firstname" as const,
    placeholder: "First name",
    label: "First name",
    compulsory: true,
    type: "text",
  },
  {
    name: "lastname" as const,
    placeholder: "Last name/Surname",
    label: "Last name/Surname",
    compulsory: true,
    type: "text",
  },
  {
    name: "email" as const,
    placeholder: "Enter Email",
    label: "Email Address",
    compulsory: true,
    type: "email",
  },
];

type PersonalInfoProp = {
  handleOTPComplete: (otp: string) => void;
  submitting: boolean;
};

const PersonalInfo = ({ handleOTPComplete, submitting }: PersonalInfoProp) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const form = useForm<ApplicationFormPayload>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange",
  });
  const { unWrapErrors } = Validator.reactHookHandler(form.formState);
  const [isCodeSent, setisCodeSent] = useState(false);

  const handleEmailverification = async (data: ApplicationFormPayload) => {
    try {
      const res = await AuthService.verificationcode(data);
      console.log(res);
      await showAlert(
        "success",
        "Successful!",
        "OTP has been sent to your email!",
        "Ok",
        "#03435F",
        () => {
          setisCodeSent(true);
        }
      );
    } catch (error) {
      form.reset();
      // setisCodeSent(false);
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-[18px] lg:text-[22px] mb-10 font-semibold font-DMSans">
        STUDENT APPLICATION
      </h2>
      <h2 className="text-[24px] lg:text-[40px] mb-6 font-semibold font-DMSans w-full lg:w-[713px]">
        Executive Diploma in Business Communication & Public Relations
      </h2>
      <div className="flex justify-start items-center gap-2">
        <p className="text-[16px] lg:text-[18px] font-semibold font-DMSans">
          Already have account?
        </p>
        <button className="text-[18px] font-semibold font-DMSans text-[#FF1515]">
          Login Now
        </button>
      </div>
      <form onSubmit={form.handleSubmit(handleEmailverification)}>
        <div className="w-full mt-4 lg:mt-[6%] grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field) => {
            if (field.type === "hidden") {
              return (
                <input
                  key={field.name}
                  type="hidden"
                  value={field.value || ""}
                  {...form.register(field.name)}
                />
              );
            }
            return (
              <BaseInput
                key={field.name}
                {...field}
                labelClassName="text-[18px] font-bold font-DMSans"
                containerClassname="w-full"
                {...form.register(field.name)}
                error={unWrapErrors(field.name)}
              />
            );
          })}
          <div className="w-full h-[66px] mx-auto">
            <div className="flex justify-start gap-2 items-center">
              <label htmlFor="phone" className="text-[18px] font-semibold">
                Call phone line
              </label>
              <FaAsterisk className="text-[#F01E00] text-[12px]" />
            </div>
            <PhoneInput
              id="phone"
              international
              defaultCountry="NG"
              value={value}
              onChange={setValue}
              className="w-full h-full px-4 py-2 no-outline mt-2 border border-gray-300 rounded-md"
            />
          </div>
          {isCodeSent && (
            <div className="">
              <h2 className=" text-[18px] font-bold font-DMSans mb-2">
                Email verification code
              </h2>
              <OTPInput length={4} onComplete={handleOTPComplete} />
              {submitting ? (
                <div className="flex mt-4 justify-start items-center gap-2">
                  <p className=" text-[18px] italic font-normal font-DMSans ">
                    Verifying code...
                  </p>
                  <LoadingSpinner size="xs" />
                </div>
              ) : (
                <h2 className=" text-[18px] italic font-normal font-DMSans mb-2">
                  Put the verification code sent to your email
                </h2>
              )}
            </div>
          )}
        </div>
        <BaseButton
          containerCLassName={`mt-4 h-[46px] w-auto rounded-[8px] bg-[#FF3B30] text-[16px] font-bold font-DMSans text-[#fff] ${
            !form.formState.isValid || form.formState.isSubmitting
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
          hoverScale={1.01}
          hoverOpacity={0.8}
          tapScale={0.9}
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
          type="submit"
        >
          <p>Verify Email</p>
        </BaseButton>
      </form>
    </div>
  );
};

export default PersonalInfo;
