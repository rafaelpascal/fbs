import React from "react";
import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";
import { Avatar } from "~/components/dashboard/Avatar";
import { BaseInput } from "~/components/data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import { DashboardArea } from "~/layouts/DashboardArea";
import { cn } from "~/utils/helpers";

const personalFields = [
  { label: "First Name", placeholder: "First Name", name: "firstName" },
  { label: "Other Name", placeholder: "Other Name", name: "otherName" },
  {
    label: "Surname/Last Name",
    placeholder: "Surname/Last Name",
    name: "lastName",
  },
  {
    label: "Location/Address",
    placeholder: "Location/Address",
    name: "location",
  },
];
const professionalFields = [
  {
    label: "Job title/position and name of organization",
    placeholder: "Job title",
    name: "job",
    type: "text",
  },
  //   {
  //     label: "Professional goals ",
  //     placeholder: "Professional goals",
  //     name: "goals",
  //     type: "text",
  //   },
  {
    label: "Years of full-time work experience",
    placeholder: "Work",
    name: "workexperience",
    type: "text",
  },
  {
    label: "Birthday",
    placeholder: "Birthday",
    name: "birthday",
    type: "date",
  },
  {
    label: "WhatsApp number",
    placeholder: "WhatsApp number",
    name: "whatsapp",
    type: "number",
  },
  {
    label: "Phone number",
    placeholder: "Phone number",
    name: "phone",
    type: "number",
  },
  {
    label: "My email address",
    placeholder: "My email address",
    name: "email",
    type: "email",
  },
];

const options = [
  { label: "Advance to a Leadership/Management position", value: 1 },
  { label: "Start/Launch/Grow a Startup", value: 2 },
  { label: "Career Change", value: 3 },
  { label: "Salary Increase", value: 4 },
  { label: "Skill Development", value: 5 },
];
const Educationoptions = [
  { label: "Undergraduate degree", value: 1 },
  { label: "O’level/High-school Diploma", value: 2 },
  { label: "Masters Degree", value: 3 },
  { label: "Post Graduate Degree", value: 4 },
  { label: "PhD", value: 5 },
];

const Profile = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    otherName: "",
    location: "",
    bio: "",
    job: "",
    goals: null,
    education: null,
    gender: null,
    workexperience: "",
    birthday: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  function handleSelect(
    field: string,
    option: { label: string; value: string }
  ): void {
    setFormData((prev) => ({ ...prev, [field]: option.value }));
  }

  return (
    <DashboardArea>
      <div>
        <h2 className="font-DMSans text-2xl font-semibold">Profile</h2>
        <p className="font-DMSans text-lg font-normal">
          showcase Your personal and professional backgrounds. highlight Your
          skills, experience, and achievements.
        </p>
        <div className="w-full p-2 lg:p-10 rounded-2xl mt-10 shadow-md bg-[#F9F9F9]">
          <div
            className={cn(
              " p-4 lg:p-10 rounded-lg w-full",
              theme === "dark" ? "bg-[#333]" : "bg-white"
            )}
          >
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-wrap justify-start items-center gap-3">
                <Avatar
                  img=""
                  name="Alexa Rawles"
                  avatarClassName="md:h-[100px] h-20 w-20 md:w-[100px] bg-[#F01E00] rounded-full"
                  textClassName="font-medium text-white text-sm"
                  wrapperClassName="max-md:gap-0"
                  color={"#fff"}
                />
                <div>
                  <h2 className="font-DMSans text-2xl font-semibold">
                    Alexa Rawles
                  </h2>
                  <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-start">
                    <p
                      className={cn(
                        "font-DMSans text-lg font-normal",
                        theme === "dark" ? "text-[#fff]" : "text-[#3D11EF]"
                      )}
                    >
                      alexarawles@gmail.com
                    </p>
                    <p className="font-DMSans text-2xl font-semibold">
                      Reg. Number: <span className="font-normal">244567</span>{" "}
                      <button className="text-[#F01E00] text-sm hover:bg-[#F01E00] hover:text-[#fff] px-4 py-2 rounded-md">
                        Copy
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              <button className="font-DMSans text-lg font-semibold bg-[#F01E00] px-4 py-2 rounded-md">
                Update
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-2">
              {personalFields.map(({ label, placeholder, name }) => (
                <BaseInput
                  key={name}
                  label={label}
                  placeholder={placeholder}
                  containerClassname="w-full"
                  labelClassName="text-[17px] font-DMSans font-semibold"
                  inputContainerClassName={cn(
                    "h-[48px]",
                    theme === "dark"
                      ? "select-secondary"
                      : "border-[0.5px] border-[#ddd]"
                  )}
                  value={formData[name as keyof typeof formData] ?? ""}
                  onChange={(e: any) =>
                    handleInputChange(
                      name as keyof typeof formData,
                      e.target.value
                    )
                  }
                />
              ))}
            </div>
            <div className="my-4">
              <BaseInput
                label="Bio"
                type="textarea"
                placeholder="Bio"
                containerClassname="w-full"
                labelClassName="text-[17px] font-DMSans font-semibold"
                inputContainerClassName={cn(
                  "h-[153px] ",
                  theme === "dark"
                    ? "select-secondary"
                    : "border-[0.5px] border-[#ddd]"
                )}
                value={formData.bio}
                onChange={(e: any) => handleInputChange("bio", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-2">
              {professionalFields.map(({ label, placeholder, type, name }) => (
                <BaseInput
                  key={name}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  containerClassname="w-full"
                  labelClassName="text-[17px] font-DMSans font-semibold"
                  inputContainerClassName={cn(
                    "h-[48px]",
                    theme === "dark"
                      ? "select-secondary"
                      : "border-[0.5px] border-[#ddd]"
                  )}
                  value={formData[name as keyof typeof formData] ?? ""}
                  onChange={(e: any) =>
                    handleInputChange(
                      name as keyof typeof formData,
                      e.target.value
                    )
                  }
                />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-2">
              <div className="w-full">
                <SelectionDropdown
                  label="Professional goals "
                  labelClassName="text-[14px] font-DMSans font-semibold mb-2"
                  options={options}
                  onSelect={(option) => handleSelect("goals", option)}
                  placeholder="Select Professional goals"
                  initialSelected={
                    formData.goals
                      ? {
                          label: formData.goals,
                          value: formData.goals,
                        }
                      : null
                  }
                />
              </div>
              <div className="w-full">
                <SelectionDropdown
                  label="My highest level of completed education"
                  labelClassName="text-[14px] font-DMSans font-semibold mb-2"
                  options={Educationoptions}
                  onSelect={(option) => handleSelect("education", option)}
                  placeholder="Select education level"
                  initialSelected={
                    formData.education
                      ? {
                          label: formData.education,
                          value: formData.education,
                        }
                      : null
                  }
                />
              </div>
              <div className="w-full">
                <SelectionDropdown
                  label="Gender"
                  labelClassName="text-[14px] font-DMSans font-semibold mb-2"
                  options={Educationoptions}
                  onSelect={(option) => handleSelect("gender", option)}
                  placeholder="Select gender"
                  initialSelected={
                    formData.gender
                      ? {
                          label: formData.gender,
                          value: formData.gender,
                        }
                      : null
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardArea>
  );
};

export default Profile;
