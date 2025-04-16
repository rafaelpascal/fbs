import { useLocation } from "react-router-dom";
import Header from "~/components/students/Header";
import Courseform from "~/feature/students/course-form";

const Application = () => {
  const { pathname } = useLocation();
  const decodedPath = decodeURIComponent(pathname);
  const pathSegments = decodedPath
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);

  const name = pathSegments[1];
  const id = pathSegments[2];

  return (
    <div>
      <Header />
      <div className="w-full flex justify-center items-center">
        <div className="w-full mt-32 mb-20 lg:w-[1485px] bg-[#EEF2F6] p-2 lg:p-10">
          <Courseform name={name} id={id} />
        </div>
      </div>
    </div>
  );
};

export default Application;
