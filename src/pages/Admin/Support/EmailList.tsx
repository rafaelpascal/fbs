import { useCallback, useState } from "react";
import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";
import { cn } from "~/utils/helpers";
import SendEmail from "./SendEmail";

const buttonParams = [
  {
    title: "All applicants",
    key: "all",
  },
  {
    title: "Admitted students",
    key: "admitted",
  },
  {
    title: "Rejected applicants",
    key: "rejected",
  },
];

const EmailList = () => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [issendMail, setissendMail] = useState(false);

  const handleSelect = useCallback(
    (key: string, option: { label: string; value: string }) => {
      setFormData((prev) => ({
        ...prev,
        [key]: option.value,
      }));
    },
    []
  );
  const handleButtonClick = (key: string) => {
    setActiveCategory(key === activeCategory ? null : key);
    setFormData({});
  };
  return (
    <>
      {issendMail ? (
        <SendEmail handleGoback={() => setissendMail(false)} />
      ) : (
        <div className="border-2 p-4 lg:p-10  border-[#ddd] rounded-md shadow-md">
          <h2 className="font-DMSans font-semibold text-lg uppercase">
            EMAIL lIST
          </h2>
          <div className=" mt-6 flex overflow-x-auto  justify-start gap-4 items-center ">
            {buttonParams.map((btnDetails) => (
              <button
                key={btnDetails.key}
                onClick={() => handleButtonClick(btnDetails.key)}
                className={`h-[224px] flex flex-col rounded-md shadow-lg justify-center items-center px-20 border-2 transition-all duration-200
            ${
              activeCategory === btnDetails.key
                ? "border-[#FF2424] text-[#FF2424]"
                : "border-[#ddd]"
            }`}
              >
                <p className="text-2xl font-DMSans font-semibold">
                  {btnDetails.title}
                </p>
                <p className="text-lg font-DMSans font-normal">105</p>
              </button>
            ))}
          </div>
          {activeCategory && (
            <div className="mt-10 w-full lg:w-[40%]">
              <h2 className="font-DMSans font-semibold text-lg uppercase">
                Send Mail{" "}
                <span className="text-[#FF2424]">
                  {activeCategory} Students
                </span>
              </h2>
              <SelectionDropdown
                label="Select Department"
                labelClassName="text-[14px] font-DMSans font-semibold mb-2"
                options={[
                  { label: "Undergraduate", value: "undergraduate" },
                  { label: "Postgraduate", value: "postgraduate" },
                  { label: "Diploma", value: "diploma" },
                ]}
                onSelect={(option) => handleSelect("courseType", option)}
                placeholder="Select Department"
                initialSelected={
                  formData.courseType
                    ? { label: formData.courseType, value: formData.courseType }
                    : null
                }
              />
              <button
                disabled={!formData.courseType}
                onClick={() => setissendMail(true)}
                className={cn(
                  "px-4 py-2 font-DMSans font-semibold text-sm text-white bg-[#FF2424] rounded-md mt-4",
                  !formData.courseType && "opacity-50 cursor-not-allowed"
                )}
              >
                SEND EMAIL/NOTIFICATION
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EmailList;
