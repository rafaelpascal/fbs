import { useForm } from "react-hook-form";
import { BaseInput } from "~/components/data-inputs/text-input";
import { ApplicationFormPayload, applicationSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Validator } from "~/utils/packages/validators";
import OTPInput from "~/components/data-inputs/OTPInput";
import { BaseButton } from "~/components/buttons/BaseButton";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { FaAsterisk } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import { AuthService } from "~/api/auth";
import { showAlert } from "~/utils/sweetAlert";
import { useDispatch } from "react-redux";
import { setUser } from "~/redux-store/slice/user.Slice";
import useCountdown from "~/hooks/useCountdown";

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
  coursetitle: string;
  handleOTPComplete: (otp: string) => void;
  submitting: boolean;
};

const PersonalInfo = ({
  coursetitle,
  handleOTPComplete,
  submitting,
}: PersonalInfoProp) => {
  const { seconds, startCountdown, resetCountdown } = useCountdown(60);
  const [resendLoading, setresendLoading] = useState(false);
  const [value, setValue] = useState<string | undefined>(undefined);
  const form = useForm<ApplicationFormPayload>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange",
  });
  const { unWrapErrors } = Validator.reactHookHandler(form.formState);
  const [isCodeSent, setisCodeSent] = useState(false);
  const initialCountdown = 30;
  const [, setCountdown] = useState(initialCountdown);
  const dispatch = useDispatch();

  const handleEmailverification = async (data: ApplicationFormPayload) => {
    try {
      const res = await AuthService.verificationcode(data);
      dispatch(
        setUser({
          userid: res?.data?.userid,
          email: res?.data?.email,
        })
      );
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

  const handleResend = async () => {
    try {
      const email = form.getValues("email"); // Retrieve the email value from the form
      const payload = { email };

      setresendLoading(true); // Show loading state
      const res = await AuthService.resendOTP(payload);
      console.log(res);

      await showAlert(
        "success",
        "Resent!",
        "OTP has been sent to your email!",
        "Ok",
        "#03435F"
      );

      setCountdown(30);
    } catch (error) {
      console.error("Error resending OTP:", error);
      await showAlert(
        "error",
        "Failed!",
        "Failed to resend OTP. Please try again.",
        "Ok",
        "#FF1515"
      );
    } finally {
      setresendLoading(false); // Hide loading state
    }
  };

  useEffect(() => {
    if (!isCodeSent) {
      startCountdown();
    }
  }, [isCodeSent]);

  // Handle resend button click
  const handleResendClick = () => {
    setresendLoading(true);
    setTimeout(() => {
      handleResend();
      resetCountdown();
      startCountdown();
    }, 1000);
  };

  return (
    <div>
      <h2 className="text-[18px] lg:text-[22px] mb-10 font-semibold font-DMSans">
        STUDENT APPLICATION
      </h2>
      <h2 className="text-[24px] lg:text-[40px] mb-6 font-semibold font-DMSans w-full lg:w-[713px]">
        {coursetitle}
      </h2>
      <div className="flex justify-start items-center gap-2">
        <p className="text-[16px] lg:text-[18px] font-semibold font-DMSans">
          Already have account?
        </p>
        <button className="text-[14px] border-[1px] border-[#ddd] px-2 py-1 rounded-md  hover:border-[#FF1515] font-semibold font-DMSans text-[#FF1515]">
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
            <>
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
                  <>
                    <h2 className=" text-[18px] italic font-normal font-DMSans mb-2">
                      Put the verification code sent to your email
                    </h2>
                    <div className="flex w-full justify-start items-center">
                      <h2 className=" text-[14px] font-semibold font-DMSans">
                        Didn’t receive the code?{" "}
                      </h2>
                      {seconds > 0 ? (
                        <span className="text-[14px] ml-2 text-[#FF1515] font-DMSans font-semibold">
                          Resend in {seconds} seconds
                        </span>
                      ) : resendLoading ? (
                        <div className="flex justify-center items-center gap-2">
                          <p className="text-[14px] text-[#FF1515] font-DMSans font-bold">
                            Resending...
                          </p>
                          <LoadingSpinner size="xs" />
                        </div>
                      ) : (
                        <button
                          onClick={handleResendClick}
                          className="text-[14px] text-[#FF1515] font-DMSans font-bold"
                        >
                          Click to resend
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
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
