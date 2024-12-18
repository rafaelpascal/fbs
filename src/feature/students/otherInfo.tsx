import { useForm } from "react-hook-form";
import { otherinfoSchema, OtherInfoFormPayload } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Validator } from "~/utils/packages/validators";
import { BaseInput } from "~/components/data-inputs/text-input";
import FileUpload from "~/components/data-inputs/FileUpload";
import { BaseButton } from "~/components/buttons/BaseButton";
import ReferalCode from "~/components/data-inputs/ReferalCode";
import { FaAsterisk } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState, useMemo, useEffect } from "react";
import countryList from "react-select-country-list";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/components/constants/routes";

const fields = [
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
const Passwordfields = [
  {
    name: "password" as const,
    placeholder: "Enter Password",
    label: "Password",
    compulsory: true,
    type: "password",
  },
  {
    name: "password" as const,
    placeholder: "Comfirm Password",
    label: "Comfirm password",
    compulsory: true,
    type: "password",
  },
];

const Otherinfo = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string | undefined>(undefined);
  const [whatappvalue, setWhatsappValue] = useState<string | undefined>(
    undefined
  );
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    fetch("https://nga-states-lga.onrender.com/fetch")
      .then((response) => response.json())
      .then((data) => {
        setStates(data);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  }, []);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  const options = useMemo(() => {
    return countryList()
      .getData()
      .map((country) => ({
        value: country.value,
        label: country.label,
      }));
  }, []);

  const form = useForm<OtherInfoFormPayload>({
    resolver: zodResolver(otherinfoSchema),
    mode: "onChange",
  });
  const { unWrapErrors } = Validator.reactHookHandler(form.formState);

  const handleFilesSelected = (files: FileList | null) => {
    if (files) {
      console.log("Selected files:", files);
    }
  };

  const handlecodeComplete = (otp: string) => {
    console.log("Complete OTP:", otp);
  };

  const handleNavigate = () => {
    navigate(ROUTES.FORM_SUBMITTED);
  };

  return (
    <div>
      <div className="w-full mt-4 lg:mt-[6%] grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="w-full h-[66px] mx-auto">
          <div className="flex justify-start gap-2 items-center">
            <label htmlFor="phone" className="text-2xl font-semibold mb-2">
              Call phone line
            </label>
            <FaAsterisk className="text-[#F01E00] mb-2 text-[12px]" />
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
        <div className="w-full mb-12 h-[66px] mx-auto">
          <div className="flex justify-start gap-2 items-center">
            <label htmlFor="phone" className="text-2xl font-semibold mb-2">
              WhatsApp
            </label>
            <FaAsterisk className="text-[#F01E00] mb-2 text-[12px]" />
          </div>
          <PhoneInput
            id="phone"
            international
            defaultCountry="NG"
            value={whatappvalue}
            onChange={setWhatsappValue}
            className="w-full h-full px-4 py-2 no-outline mt-2 border border-gray-300 rounded-md"
          />
        </div>
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
              {options.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full lg:w-[50%]">
            <p className="mb-2 text-[18px] font-bold font-DMSans">State</p>
            <select
              className="select text-[18px] font-bold font-DMSans h-[67px] select-bordered w-full max-w-xs"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option disabled selected>
                Select State
              </option>
              {states.map((state: string, index: number) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
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
          <div className="flex justify-start gap-2 items-center">
            <h2 className="text-2xl font-semibold mb-4">
              Upload Your O'Level Certificate
            </h2>
            <FaAsterisk className="text-[#F01E00] mb-4 text-[12px]" />
          </div>
          <FileUpload onFilesSelected={handleFilesSelected} />
        </div>
        <div className="py-2 w-full">
          <div className="flex justify-start gap-2 items-center">
            <h2 className="text-2xl font-semibold mb-4">Upload your CV</h2>
            <FaAsterisk className="text-[#F01E00] mb-4 text-[12px]" />
          </div>
          <FileUpload onFilesSelected={handleFilesSelected} />
        </div>
        <div className="py-2 w-full">
          <div className="flex justify-start gap-2 items-center">
            <h2 className="text-2xl font-semibold mb-4">
              Upload Your Original Degree Certificate or Postgraduate Diploma
            </h2>
            <FaAsterisk className="text-[#F01E00] mb-4 text-[12px]" />
          </div>
          <FileUpload onFilesSelected={handleFilesSelected} />
        </div>
        <div className="py-2 w-full">
          <div className="flex justify-start gap-2 items-center">
            <h2 className="text-2xl mb-12 font-semibold">Upload Your Resume</h2>
            <FaAsterisk className="text-[#F01E00] mb-12 text-[12px]" />
          </div>
          <FileUpload onFilesSelected={handleFilesSelected} />
        </div>
        <div className="">
          <h2 className=" text-[18px] font-bold font-DMSans mb-2">
            Referral code
          </h2>
          <ReferalCode length={4} onComplete={handlecodeComplete} />
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
      <div className="flex justify-between items-center gap-4 mt-4">
        {Passwordfields.map((field, index) => (
          <BaseInput
            key={index}
            {...field}
            labelClassName="text-[18px] font-bold font-DMSans"
            containerClassname="w-full"
            {...form.register(field.name)}
            error={unWrapErrors(field.name)}
          />
        ))}
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
        containerCLassName="mt-4 h-[66px] w-full rounded-[8px] bg-[#FF3B30] text-[16px] font-bold font-DMSans text-[#fff]"
        hoverScale={1.01}
        hoverOpacity={0.8}
        tapScale={0.9}
        onClick={handleNavigate}
      >
        <p>APPLY FOR THE PROGRAM NOW</p>
      </BaseButton>
    </div>
  );
};

export default Otherinfo;
