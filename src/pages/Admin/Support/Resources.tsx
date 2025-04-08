import { cn } from "~/utils/helpers";

const ResourcesData = [
  {
    id: 1,
    title: "Unilever's Response to the Future of Work.",
    price: "$19",
    author: "by: William R. KerrEmilie BillaudMette Fuglsang Hjortshoe",
    description:
      "How one of the world's largest consumer goods companies is reskilling its workforce, adopting flexible work practices, and accelerating its pace of change. How one of the world's largest consumer goods companies is reskilling its workforce, adopting flexible work practices, and accelerating its pace of change....",
    published: "April 07, 2020",
  },
  {
    id: 1,
    title: "Business Model Development",
    price: "$7",
    author: "by: William R. KerrEmilie BillaudMette Fuglsang Hjortshoe",
    description:
      "How one of the world's largest consumer goods companies is reskilling its workforce, adopting flexible work practices, and accelerating its pace of change. How one of the world's largest consumer goods companies is reskilling its workforce, adopting flexible work practices, and accelerating its pace of change....",
    published: "April 07, 2020",
  },
];
import { useState } from "react";
import { useTheme } from "~/context/theme-provider";
import { BaseInput } from "~/components/data-inputs/text-input";
import { ROUTES } from "~/components/constants/routes";
import { Link } from "react-router-dom";

const Resources = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    courseTitle: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className="">
      {ResourcesData.map((data, index) => (
        <div
          key={index}
          className="border flex flex-col gap-3 justify-start items-start border-[#929292] my-2 p-4 lg:px-10 rounded-md "
        >
          <h2 className="text-4xl font-DMSans font-bold text-left">
            {data.title} <span className="text-[#757575]">({data.price})</span>
          </h2>
          <p className="text-[#3D85F9] font-DMSans font-normal text-left">
            {data.author}
          </p>
          <p className="font-DMSans font-normal text-left">
            {data.description}
          </p>
          <Link
            target="_blank"
            to={ROUTES.SINGLERESOURCE}
            className="font-DMSans font-semibold text-left"
          >
            Show more
          </Link>
          <div className="w-full flex justify-center items-center">
            <h2 className="font-DMSans w-full lg:w-[50%] text-xl font-bold text-left">
              Published: <span className="font-normal">{data.published}</span>
            </h2>
            <div className="flex justify-center items-center gap-2 w-full lg:w-[50%]">
              <BaseInput
                label=""
                placeholder="Enter coupon code"
                containerClassname="w-[50%]"
                labelClassName="text-[17px] font-DMSans font-semibold"
                inputContainerClassName={cn(
                  "h-[48px] ",
                  theme === "dark"
                    ? "select-secondary"
                    : "border-[0.5px] border-[#ddd]"
                )}
                value={formData.courseTitle}
                onChange={(e: any) =>
                  handleInputChange("courseTitle", e.target.value)
                }
              />
              <button className="bg-[#FF5A5A] px-4 py-2 rounded-md text-white font-DMSans font-semibold text-left">
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Resources;
