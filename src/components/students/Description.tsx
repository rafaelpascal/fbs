interface DescriptionProps {
  description: string;
}
const Description = ({ description }: DescriptionProps) => {
  return (
    <div>
      <h2 className="font-DMSans font-semibold mb-4">Description</h2>
      <p className="text-left font-DMSans font-normal  leading-[26px]">
        {description}
      </p>
      <button className="text-[#FF3B30] font-DMSans font-normal">
        Show More
      </button>
    </div>
  );
};

export default Description;
