import { useForm } from "react-hook-form";
import { otherinfoSchema, OtherInfoFormPayload } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Validator } from "~/utils/packages/validators";
import { BaseInput } from "~/components/data-inputs/text-input";
// import FileUpload from "~/components/data-inputs/FileUpload";
import { BaseButton } from "~/components/buttons/BaseButton";
import ReferalCode from "~/components/data-inputs/ReferalCode";
import { FaAsterisk } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState, useMemo, useEffect, useCallback } from "react";
import countryList from "react-select-country-list";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "~/components/constants/routes";
import FileUpload from "~/components/data-inputs/Document";
import { useSelector } from "react-redux";
import { RootState } from "~/redux-store/store";
import { AuthService } from "~/api/auth";
import { showAlert } from "~/utils/sweetAlert";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

const fields = [
  {
    name: "address" as const,
    placeholder: "Residential Address",
    label: "Residential Address",
    compulsory: true,
    type: "text",
  },
  {
    name: "dob" as const,
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
    name: "confirm_password" as const,
    placeholder: "Comfirm Password",
    label: "Comfirm password",
    compulsory: true,
    type: "password",
  },
];

const Otherinfo = ({ isSubsequent }: { isSubsequent: boolean }) => {
  const { pathname } = useLocation();
  const decodedPath = decodeURIComponent(pathname);
  const pathSegments = decodedPath
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);
  const id = pathSegments[2];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRequirements = useSelector(
    (state: RootState) => state.formRequirements.form_requirements
  );
  const navigate = useNavigate();
  const [value, setValue] = useState<string | undefined>(undefined);
  const [referralCode, setreferralCode] = useState("");
  const [whatappvalue, setWhatsappValue] = useState<string | undefined>(
    undefined
  );
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string | undefined>(
    undefined
  );
  const [levelCertificate, setLevelCertificate] = useState<File | null>(null);
  const [cv, setCv] = useState<File | null>(null);
  const [degreeCertificate, setDegreeCertificate] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Male");
  const user = useSelector((state: RootState) => state.user);

  // Handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAccepted(event.target.checked);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(event.target.value);
  };

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

  const handleFileUpload = (requirement: string, file: File | null) => {
    const normalizedRequirement = requirement.trim().toLowerCase();

    switch (normalizedRequirement) {
      case "olevel":
        setLevelCertificate(file);
        break;
      case "curriculum-vitae":
        setCv(file);
        break;
      case "degree_certificate":
        setDegreeCertificate(file);
        break;
      case "resume":
        setResume(file);
        break;
      default:
        console.warn(`Unknown requirement: ${requirement}`);
    }
  };

  useEffect(() => {
    console.log(cv, degreeCertificate, levelCertificate, resume);
  }, [cv, degreeCertificate, levelCertificate, resume]);

  const handleReferalCodeComplete = (otp: string) => {
    setreferralCode(otp);
  };

  const handleNavigate = () => {
    navigate(ROUTES.FORM_SUBMITTED);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    try {
      e.preventDefault();

      const formData = new FormData();

      if (user) {
        formData.append("email", user.email);
        formData.append("firstname", user.firstname);
        formData.append("lastname", user.lastname);
        formData.append("userid", JSON.stringify(user.userid));
      }

      // Add phone and WhatsApp values
      if (value) formData.append("phone", value);
      if (whatappvalue) formData.append("whatsapp_phone", whatappvalue);

      // Add other form fields
      fields.forEach((field) => {
        const fieldValue = form.getValues(field.name);
        if (fieldValue) {
          formData.append(field.name, fieldValue);
        }
      });

      Passwordfields.forEach((field) => {
        const fieldValue = form.getValues(field.name);
        if (fieldValue) {
          formData.append(field.name, fieldValue);
        }
      });

      // Add state and country
      if (selectedState) formData.append("state", selectedState);
      const selectedCountry = document.querySelector<HTMLSelectElement>(
        "select[name='country']"
      )?.value;
      if (selectedCountry) formData.append("country", selectedCountry);
      if (selectedGender) formData.append("gender", selectedGender);
      if (id) formData.append("programmeid", id);
      if (levelCertificate) {
        formData.append("olevel_certificate", levelCertificate);
      }
      if (cv) {
        formData.append("cv", cv);
      }
      if (degreeCertificate) {
        formData.append("degree_certificate", degreeCertificate);
      }
      if (resume) {
        formData.append("resume", resume);
      }
      if (referralCode) formData.append("referral_code", referralCode);
      const howDidYouHear = document.querySelector<HTMLSelectElement>(
        "select[name='source']"
      )?.value;
      if (howDidYouHear) formData.append("hear_aboutus", howDidYouHear);
      if (isAccepted) formData.append("iagree", isAccepted ? "1" : "0");

      if (isSubsequent) {
        await AuthService.subsequentApplication(formData);
        setIsSubmitting(false);
        await showAlert(
          "success",
          "Successful!",
          "Successfully submitted application!",
          "Ok",
          "#03435F",
          () => {
            handleNavigate();
          }
        );
      } else {
        await AuthService.continueApplication(formData);
        setIsSubmitting(false);
        await showAlert(
          "success",
          "Successful!",
          "Account Successfully cretaed!",
          "Ok",
          "#03435F",
          () => {
            handleNavigate();
          }
        );
      }
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };

  const handleClearOtp = useCallback(() => {
    setreferralCode("");
  }, [setreferralCode]);

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
                value="Male"
                className="radio mt-2"
                checked={selectedGender === "Male"}
                onChange={handleGenderChange}
              />
              <p className="mt-2 text-[18px] font-bold font-DMSans">Male</p>
            </div>
            <div className="flex justify-start items-center gap-2">
              <input
                type="radio"
                name="radio-1"
                value="Female"
                className="radio mt-2"
                checked={selectedGender === "Female"}
                onChange={handleGenderChange}
              />
              <p className="mt-2 text-[18px] font-bold font-DMSans">Female</p>
            </div>
          </div>
        </div>
        {formRequirements.length !== 0 && (
          <div>
            {formRequirements.map((requirement) => (
              <div key={requirement.id} className="py-2 w-full">
                <div className="flex justify-start gap-2 items-center">
                  <h2 className="text-2xl font-semibold mb-4">
                    {requirement.requirement_text}
                  </h2>
                  <FaAsterisk className="text-[#F01E00] mb-4 text-[12px]" />
                </div>
                <FileUpload
                  onFileUpload={(file) =>
                    handleFileUpload(requirement.requirements, file)
                  }
                />
              </div>
            ))}
          </div>
        )}
        <div className="w-full">
          <h2 className="text-[18px] font-bold font-DMSans mb-2">
            Referral code
          </h2>
          <ReferalCode
            length={4}
            onComplete={handleReferalCodeComplete}
            onClear={handleClearOtp}
          />
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
      {!isSubsequent && (
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
      )}
      <div className="mt-4 w-full flex justify-start items-center">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            className="checkbox"
            checked={isAccepted}
            onChange={handleCheckboxChange}
          />
          <span className="text-[15px] ml-4 font-semibold font-DMSans">
            Accept the Terms and Privacy Policy of Fordax
          </span>
        </label>
      </div>
      {isSubsequent ? (
        <BaseButton
          containerCLassName="mt-4 h-[66px] w-full rounded-[8px] bg-[#FF3B30] text-[16px] font-bold font-DMSans text-[#fff]"
          hoverScale={1.01}
          hoverOpacity={0.8}
          tapScale={0.9}
          onClick={handleSubmit}
        >
          <p>SUBMIT APPLICATION</p>
          {isSubmitting && <LoadingSpinner size="xs" />}
        </BaseButton>
      ) : (
        <BaseButton
          containerCLassName="mt-4 h-[66px] w-full rounded-[8px] bg-[#FF3B30] text-[16px] font-bold font-DMSans text-[#fff]"
          hoverScale={1.01}
          hoverOpacity={0.8}
          tapScale={0.9}
          onClick={handleSubmit}
        >
          <p>APPLY FOR THE PROGRAM NOW</p>
          {isSubmitting && <LoadingSpinner size="xs" />}
        </BaseButton>
      )}
    </div>
  );
};

export default Otherinfo;
