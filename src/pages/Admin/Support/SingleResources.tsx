import { DashboardArea } from "~/layouts/DashboardArea";

const SingleResources = () => {
  return (
    <DashboardArea>
      <div className="flex flex-col justify-start items-center">
        <h2 className="text-xl border-b-2 border-[#ddd] mb-4 py-4 w-full lg:w-[70%] font-DMSans font-bold text-left">
          Fordax Resources{" "}
        </h2>
        <h2 className="text-4xl w-full lg:w-[70%] font-DMSans font-bold text-left">
          Customer relations 101: Beginner’s guide to building relationships
        </h2>
        <p className="text-[#3D85F9] w-full lg:w-[70%] mt-4 font-DMSans font-normal text-left">
          by: William R. KerrEmilie BillaudMette Fuglsang Hjortshoe
        </p>
        <p className="font-DMSans text-lg w-full lg:w-[70%] mt-10 font-normal text-left">
          The Digital Literacy Certificate Course (DLCC) teaches essential
          skills for the modern digital world. Students learn basic computer
          use, internet browsing, online research, e-mail and social media
          communication, video conferencing, and online safety. The course also
          covers AI basics, digital collaboration tools, and creating and
          selling digital products.
        </p>
        <div className="w-full lg:w-[70%] py-6 space-y-3">
          <div className="text-gray-700">
            <p className="text-lg font-DMSans font-bold text-left">
              Publication Date:{" "}
              <span className="font-normal">April 07, 2020</span>
            </p>
            <p className="text-lg font-DMSans font-bold text-left">
              Industry: <span className="font-normal">Business Consulting</span>
            </p>
            <p className="text-lg font-DMSans font-bold text-left">
              Pages: <span className="font-normal">17</span>
            </p>
            <p className="text-lg font-DMSans font-bold text-left">
              Source:{" "}
              <span className="font-normal">Fordax Business School</span>
            </p>
            <p className="text-lg font-DMSans font-bold text-left">
              Related Topics:{" "}
              <span className="font-normal">
                Business game, game theory, finance, Money, Banking, Agril fill
              </span>
            </p>
          </div>
        </div>
        <h2 className="text-xl w-full lg:w-[70%] font-DMSans font-bold text-left">
          $11 USD
        </h2>
        <div className="w-full lg:w-[70%] mt-4">
          <h2 className="text-xl  font-DMSans font-bold text-left">Format</h2>
          <p className="text-xl border-2 border-[#ddd] p-4 w-[80px] font-DMSans font-bold text-left">
            PDF
          </p>
        </div>
        <div className="w-full lg:w-[70%] mt-4">
          <h2 className="text-xl  font-DMSans font-bold text-left">
            Languages
          </h2>
          <p className="text-xl border-2 border-[#ddd] p-4 w-[120px] font-DMSans font-bold text-left">
            English
          </p>
        </div>
        <div className="w-full lg:w-[70%] mt-4 border-2 rounded-md p-4 border-[#ddd]">
          <div className="flex justify-start items-center gap-3 mt-4">
            <h2 className="text-xl  font-DMSans font-bold text-left">Qty</h2>
            <p className="text-xl border-2 border-[#ddd] p-4 w-[120px] font-DMSans font-bold text-left">
              1
            </p>
            <p className="text-xl font-DMSans font-normal text-[#5A6ACF] text-left">
              Copyrighted PDFs are for individual use only. Add copies before
              sharing with your team.
            </p>
          </div>
          <div className="flex flex-col mt-6 lg:flex-row justify-start items-center gap-4">
            <button className="bg-[#FF5A5A] px-4 py-2 text-white font-DMSans font-semibold text-left">
              BUY NOW
            </button>
            <button className="bg-[#336CFB] px-4 py-2 text-white font-DMSans font-semibold text-left">
              Subscribe (3 months)
            </button>
          </div>
        </div>
      </div>
    </DashboardArea>
  );
};

export default SingleResources;
