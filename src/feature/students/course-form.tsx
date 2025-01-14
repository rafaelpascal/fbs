import { useTheme } from "~/context/theme-provider";
import PersonalInfo from "./personal-data";
import Otherinfo from "./otherInfo";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthService } from "~/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/redux-store/store";
import { setUser } from "~/redux-store/slice/user.Slice";
import { CourseServices } from "~/api/course";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

type CourseFormProps = {
  name: string;
  id: string;
};

const Courseform = ({ name, id }: CourseFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    cohortid: null,
    course_title: "",
  });
  const { theme } = useTheme();
  const [isEmailVerified, setEmail] = useState(false);
  const [submitting, isSubmitted] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleOTPComplete = async (otp: string) => {
    isSubmitted(true);
    try {
      const payload = {
        otp: otp,
        email: user.email,
        userid: JSON.stringify(user.userid),
      };
      const res = await AuthService.validateOTP(payload);
      dispatch(
        setUser({
          userid: res?.data?.data[0]?.userid,
          firstname: res?.data?.data[0]?.firstname,
          lastname: res?.data?.data[0]?.lastname,
          email: res?.data?.data[0]?.email,
        })
      );
      setEmail(true);
      isSubmitted(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourse = async () => {
    try {
      setIsLoading(true);
      const payload = {
        title: name,
        courseid: JSON.parse(id),
      };
      const course = await CourseServices.getCourse(payload);
      console.log("bbbbbb", course);

      setCourseData(course.data.course_details[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
  }, [name, id]);

  return (
    <div
      className={`p-4 lg:p-10 ${theme === "dark" ? "bg-[#333]" : "bg-[#fff]"}`}
    >
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <PersonalInfo
          handleOTPComplete={handleOTPComplete}
          submitting={submitting}
          coursetitle={courseData.course_title}
        />
      )}

      {/* Animate the dropdown using Framer Motion */}
      <AnimatePresence>
        {isEmailVerified && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Otherinfo />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Courseform;
