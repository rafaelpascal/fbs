import { useLocation } from "react-router-dom";
import Contents from "~/components/students/Contents";
import Footer from "~/components/students/Footer";
import Header from "~/components/students/Header";

const NewCourse = () => {
  const { pathname } = useLocation();
  const decodedPath = decodeURIComponent(pathname);
  const pathSegments = decodedPath
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);

  const name = pathSegments[0];
  const id = pathSegments[1];

  console.log(name, id);

  return (
    <div className="">
      <Header />
      <Contents id={id} name={name} />
      <Footer />
    </div>
  );
};

export default NewCourse;
