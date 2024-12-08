import FooterBtnList from "../list/FooterBtnList";

type FacilitatorsProps = {
  Title: string;
  items: string[];
};

const FooterbtnItem: FacilitatorsProps[] = [
  {
    Title: "ABOUT",
    items: [
      "About Us",
      "Learner Stories",
      "Careers",
      "Leadership",
      "Contact Us",
    ],
  },
  {
    Title: "CATEGORIES",
    items: [
      "Development",
      "Business",
      "Finance & Accounting",
      "Office Productivity",
    ],
  },
  {
    Title: "",
    items: [
      "Lifiestyle",
      "Photography & Video",
      "Health & Fitness",
      "Music",
      "UX Design",
      "Seo",
    ],
  },
  {
    Title: "SUPPORT",
    items: ["Documentation", "FAQS", "Dashboard", "Contact"],
  },
];

const EventFooter = () => {
  return (
    <div className="relative mt-10 py-10 flex flex-col justify-center items-center bg-black w-full">
      <div className="w-full  flex justify-between items-center flex-col lg:flex-row lg:w-[1218px] ">
        <div className="text-[#fff]">
          <h2>Call us</h2>
          <p>234 00 388 80 90</p>
          <div className="mt-8">
            <h2>234 lorem ipsum </h2>
            <p>hi@fordax.com</p>
          </div>
        </div>
        {FooterbtnItem.map((facilitator, index) => (
          <FooterBtnList
            key={index}
            items={facilitator.items}
            title={facilitator.Title}
            ordered={false}
            customClass=""
          />
        ))}
      </div>
      <div className="text-white  flex-col lg:flex-row py-10 w-full lg:w-[1218px] flex justify-between items-center">
        <p>© 2024 fordax. All Right Reserved.</p>
        <div className="flex flex-col lg:flex-row justify-end items-center gap-4">
          <button>Help</button>
          <button>Privacy</button>
          <button>Policy</button>
          <button>Cookie</button>
          <button>Notice</button>
          <button>Security</button>
          <button>Terms of Use</button>
        </div>
      </div>
    </div>
  );
};

export default EventFooter;
