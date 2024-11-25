import { useForm } from "react-hook-form";
import { otherinfoSchema, OtherInfoFormPayload } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Validator } from "~/utils/packages/validators";
import { BaseInput } from "~/components/data-inputs/text-input";
import FileUpload from "~/components/data-inputs/FileUpload";
import OTPInput from "~/components/data-inputs/OTPInput";
import { BaseButton } from "~/components/buttons/BaseButton";

const fields = [
  {
    name: "phone" as const,
    placeholder: "Enter phone no",
    label: "Call phone line",
    compulsory: true,
    type: "number",
  },
  {
    name: "whatsapp" as const,
    placeholder: "Enter phone no",
    label: "WhatsApp",
    compulsory: false,
    type: "number",
  },
  {
    name: "address" as const,
    placeholder: "Residential Address",
    label: "Residential Address",
    compulsory: true,
    type: "text",
  },
  {
    name: "dateofbirth" as const,
    placeholder: "Date of birth",
    label: "Date of birth",
    compulsory: true,
    type: "date",
  },
];

const Otherinfo = () => {
  const form = useForm<OtherInfoFormPayload>({
    resolver: zodResolver(otherinfoSchema),
    mode: "onChange",
  });
  const { unWrapErrors } = Validator.reactHookHandler(form.formState);

  const handleFilesSelected = (files: FileList | null) => {
    if (files) {
      console.log("Selected files:", files);
      // Perform any additional actions with the selected files here
    }
  };

  const handleOTPComplete = (otp: string) => {
    console.log("Complete OTP:", otp);
    // Add your OTP verification logic here
  };

  return (
    <div>
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
        <div className="flex justify-between items-center gap-3">
          <div className="w-full lg:w-[50%]">
            <p className="mb-2 text-[18px] font-bold font-DMSans">Country</p>
            <select className="select text-[18px] font-bold font-DMSans h-[67px] select-bordered w-full max-w-xs">
              <option disabled selected>
                Select Country
              </option>
              <option>Nigeria</option>
              <option>Spain</option>
            </select>
          </div>
          <div className="w-full lg:w-[50%]">
            <p className="mb-2 text-[18px] font-bold font-DMSans">State</p>
            <select className="select text-[18px] font-bold font-DMSans h-[67px] select-bordered w-full max-w-xs">
              <option disabled selected>
                Select State
              </option>
              <option>Abia</option>
              <option>Enugu</option>
            </select>
          </div>
        </div>
        <div>
          <p className="my-2 text-[18px] font-bold font-DMSans">Gender</p>
          <div className="flex justify-start gap-4 items-center">
            <div className="flex justify-start items-center gap-2">
              <input
                type="radio"
                name="radio-1"
                className="radio mt-2"
                defaultChecked
              />
              <p className="mt-2 text-[18px] font-bold font-DMSans">Male</p>
            </div>
            <div className="flex justify-start items-center gap-2">
              <input type="radio" name="radio-1" className="radio mt-2" />
              <p className="mt-2 text-[18px] font-bold font-DMSans">Female</p>
            </div>
          </div>
        </div>
        <div className="py-2 w-full">
          <h2 className="text-2xl font-semibold mb-4">
            Upload Your O'Level Certificate
          </h2>
          <FileUpload onFilesSelected={handleFilesSelected} />
        </div>
        <div className="py-2 w-full">
          <h2 className="text-2xl font-semibold mb-4">Upload your CV</h2>
          <FileUpload onFilesSelected={handleFilesSelected} />
        </div>
        <div className="py-2 w-full">
          <h2 className="text-2xl font-semibold mb-4">
            Upload Your Original Degree Certificate or Postgraduate Diploma
          </h2>
          <FileUpload onFilesSelected={handleFilesSelected} />
        </div>
        <div className="py-2 w-full">
          <h2 className="text-2xl mb-12 font-semibold">Upload Your Resume</h2>
          <FileUpload onFilesSelected={handleFilesSelected} />
        </div>
        <div className="">
          <h2 className=" text-[18px] font-bold font-DMSans mb-2">
            Referral code
          </h2>
          <OTPInput length={4} onComplete={handleOTPComplete} />
        </div>
        <div className="w-full">
          <p className="mb-2 text-[18px] font-bold font-DMSans">
            How did you hear about Fordax?
          </p>
          <select className="select text-[18px] font-bold font-DMSans h-[67px] select-bordered w-full">
            <option disabled selected>
              Select
            </option>
            <option>Facebook Advert</option>
            <option>Instagram Advert</option>
          </select>
        </div>
      </div>
      <div className="form-control mt-4 w-full lg:w-[30%]">
        <label className="label cursor-pointer">
          <input type="checkbox" className="checkbox" />
          <span className="label-text  text-[15px] font-normal font-DMSans">
            Accept the Terms and Privacy Policy of Fordax
          </span>
        </label>
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
        disabled={!form.formState.isValid || form.formState.isSubmitting}
        loading={form.formState.isSubmitting}
      >
        <p>APPLY FOR THE PROGRAM NOW</p>
      </BaseButton>
    </div>
  );
};

export default Otherinfo;
