import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CourseServices } from "~/api/course";
import { fetchPaymentPlans } from "~/api/course/hooks";
import { BaseButton } from "~/components/buttons/BaseButton";
import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";
import { NewPaymentModal } from "~/components/Modal/NewPaymentModal";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { useTheme } from "~/context/theme-provider";
import { DashboardArea } from "~/layouts/DashboardArea";
import { RootState } from "~/redux-store/store";

type ProgramSpecification = {
  title: string;
  duration: string | null;
};

const Payment = () => {
  const user = useSelector((state: RootState) => state.user);
  const { data } = fetchPaymentPlans();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [newPayment, setPayment] = useState(false);
  const [programSpecifications, setProgramSpecifications] = useState<
    ProgramSpecification[]
  >([]);
  // const navigate = useNavigate();
  const handleSelect = (option: { label: string; value: string | number }) => {
    console.log("Selected option:", option);
  };

  const handlePayment = () => {
    setPayment(true);
  };

  const handleClose = () => {
    setPayment(false);
  };

  const mappedOptions = data?.payment_plan.map((plan: any) => ({
    label: plan.category,
    value: plan.payment_planid,
  }));

  const fetchmyapplication = async () => {
    setLoading(true);
    try {
      const payload = {
        userid: user.userid,
      };
      const res = await CourseServices.fetchApplication(payload);

      if (res.data && res.data.data && res.data.data.length > 0) {
        const application = res.data.data[0];
        setCourseTitle(application.course_title);
        const updatedProgramSpecifications = [
          {
            title: "Format",
            duration: application.course_mode || "N/A",
          },
          {
            title: "Course Starting",
            duration:
              moment(application.start_date).format("DD MMM YYYY") || "N/A",
          },
          {
            title: "Cohort",
            duration: "N/A",
          },
          {
            title: "Application Date",
            duration: moment(application.created_at).format("DD MMM YYYY")
              ? new Date(application.created_at).toLocaleDateString()
              : "N/A",
          },
          {
            title: "Course Ending",
            duration:
              moment(application.end_date).format("DD MMM YYYY") || "N/A",
          },
          {
            title: "Duration",
            duration: application.duration
              ? `${application.duration} week(s)`
              : "N/A",
          },
        ];
        setProgramSpecifications(updatedProgramSpecifications);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    }
  };

  useEffect(() => {
    fetchmyapplication();
  }, []);

  return (
    <DashboardArea>
      <div className="shadow-md flex justify-center items-center rounded-[12px] w-full h-full py-12">
        <div className="w-full lg:w-[80%] ">
          <p className=" mb-6 font-DMSans text-[24px] font-semibold">Payment</p>
          <div className=" lg:w-[90%]">
            <p className="text-left capitalize font-DMSans text-[20px] font-semibold">
              {courseTitle}
            </p>
            {loading ? (
              <div className="flex justify-center items-center w-full py-6">
                <LoadingSpinner size="sm" />
              </div>
            ) : (
              <div className="w-full my-4 flex justify-center items-center">
                <div className="w-full my-4 grid grid-cols-1 lg:grid-cols-3">
                  {programSpecifications.map((specifications, index) => (
                    <div
                      key={index}
                      className="mx-2 flex flex-row flex-wrap justify-start items-center"
                    >
                      <p className="text-[18px] font-semibold font-DMSans">
                        {specifications.title}
                      </p>
                      {" : "}
                      <p className="text-[18px] capitalize font-normal font-DMSans">
                        {specifications.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="py-8">
              <p className="mb-6 font-DMSans text-[24px] font-semibold">
                Chose A Payment Plan
              </p>
              <div className="w-full lg:w-[399px]">
                <SelectionDropdown
                  options={mappedOptions}
                  onSelect={handleSelect}
                />
              </div>
              <div className="overflow-x-auto mt-6 w-full lg:w-[717px]">
                <table
                  className={`table ${
                    theme === "light"
                      ? "border-[1px] border-[#000000]"
                      : "border-[1px] border-[#fff]"
                  } `}
                >
                  {/* head */}
                  <thead>
                    <tr className="bg-[#757575] text-[#fff]">
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {/* row 1 */}
                    <tr>
                      <th>Professional Certificate in human dev...</th>
                      <td>1</td>
                      <td>75,000</td>
                      <td>75,000</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th></th>
                      <td></td>
                      <td>Subtotal</td>
                      <td>75,000</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th></th>
                      <td></td>
                      <td>Discount</td>
                      <td>0.00</td>
                    </tr>
                    <tr className="font-bold">
                      <th></th>
                      <td></td>
                      <td>Total</td>
                      <td>75,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-start gap-4 items-center">
              <input
                type="text"
                placeholder="Enter Coupon"
                className="bg-transparent p-2 text-[#000] rounded-[8px] border-[1px] border-[#757575]"
              />
              <BaseButton
                containerCLassName={`h-[49px] w-full lg:w-[224px] rounded-[8px] bg-[#47C839] text-[16px] font-bold font-DMSans text-[#fff] `}
                hoverScale={1.01}
                hoverOpacity={0.8}
                tapScale={0.9}
              >
                <p>Redeem coupon</p>
              </BaseButton>
            </div>
            <div className="flex justify-start items-center gap-2 my-4">
              <input type="checkbox" name="" id="" />
              <p className="text-[#7F7F7F] text-left font-DMSans text-[15px] font-semibold">
                I hereby accept the{" "}
                <span className="text-[#F01E00]">
                  enrollment payment terms & conditions
                </span>
              </p>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <BaseButton
                containerCLassName={`mt-4 h-[49px] w-full lg:w-[280px] rounded-[8px] bg-[#FF3B30] text-[16px] font-bold font-DMSans text-[#fff] `}
                hoverScale={1.01}
                hoverOpacity={0.8}
                tapScale={0.9}
                onClick={handlePayment}
              >
                <p>Proceed with payment</p>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
      <NewPaymentModal isOpen={newPayment} closeModal={handleClose} />
    </DashboardArea>
  );
};

export default Payment;
