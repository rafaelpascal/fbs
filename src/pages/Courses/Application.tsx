import Header from "~/components/students/Header";
import Courseform from "~/feature/students/course-form";

const Application = () => {
  return (
    <div>
      <Header />
      <div className="w-full flex justify-center items-center">
        <div className="w-full lg:w-[1485px] bg-[#EEF2F6] p-4 lg:p-10">
          <Courseform />
        </div>
      </div>
    </div>
  );
};

export default Application;
