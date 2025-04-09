import { useParams } from "react-router-dom";
import Contents from "~/components/students/Contents";
import Footer from "~/components/students/Footer";
import Header from "~/components/students/Header";

const NewCourse = () => {
  const { id } = useParams();
  return (
    <div className="">
      <Header />
      <Contents id={id} />
      <Footer />
    </div>
  );
};

export default NewCourse;
