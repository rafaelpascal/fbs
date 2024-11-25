import { useForm } from "react-hook-form";
import { BaseInput } from "~/components/data-inputs/text-input";
import { ApplicationFormPayload, applicationSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Validator } from "~/utils/packages/validators";
import OTPInput from "~/components/data-inputs/OTPInput";

const fields = [
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
};

const PersonalInfo = ({ handleOTPComplete }: PersonalInfoProp) => {
  const form = useForm<ApplicationFormPayload>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange",
  });
  const { unWrapErrors } = Validator.reactHookHandler(form.formState);

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
      <div className="w-full mt-4 lg:mt-[6%] grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <BaseInput
            key={field.name}
            {...field}
            labelClassName="text-[18px] font-bold font-DMSans"
            containerClassname="w-full"
            {...form.register(field.name)}
            error={unWrapErrors(field.name)}
          />
        ))}
        <div className="">
          <h2 className=" text-[18px] font-bold font-DMSans mb-2">
            Email verification code
          </h2>
          <OTPInput length={4} onComplete={handleOTPComplete} />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
