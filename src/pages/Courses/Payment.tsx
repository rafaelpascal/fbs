import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CourseServices } from "~/api/course";
import { BaseButton } from "~/components/buttons/BaseButton";
import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";
import { NewPaymentModal } from "~/components/Modal/NewPaymentModal";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { useTheme } from "~/context/theme-provider";
import { DashboardArea } from "~/layouts/DashboardArea";
import { setCourseId } from "~/redux-store/slice/course.slice";
import { cn, formatToCurrency } from "~/utils/helpers";

type ProgramSpecification = {
  title: string;
  duration: string | null;
};

const PaymentPlan = [
  { label: "Full Payment", value: 1 },
  { label: "Installment", value: 2 },
];

const Payment = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState(0);
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [formattedAmount, setFormattedAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [applicationData, setApplicationData] = useState({
    naira_amount: 0,
    usd_amount: 0,
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    course_title: "",
    installment: "",
    program_plan: "",
  });

  const [newPayment, setPayment] = useState({
    applicationid: 0,
    status: false,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [programSpecifications, setProgramSpecifications] = useState<
    ProgramSpecification[]
  >([]);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "NGN" ? "USD" : "NGN"));
  };
  // const navigate = useNavigate();
  const handleSelect = (option: { label: string; value: string | number }) => {
    if (option.value === 1) {
      setPaymentPlan(1);
    } else {
      setPaymentPlan(2);
    }
  };

  const handlePayment = () => {
    if (id) {
      setPayment({
        applicationid: JSON.parse(id),
        status: true,
      });
    }
  };

  const handleClose = () => {
    setPayment({
      applicationid: 0,
      status: false,
    });
  };

  const fetchmyapplication = async () => {
    setLoading(true);
    try {
      if (id) {
        const payload = {
          applicationid: JSON.parse(id),
        };

        const res = await CourseServices.fetchSingleApplication(payload);
        sessionStorage.setItem("course_id", res.data.data[0].course_id);
        if (res.data && res.data.data && res.data.data.length > 0) {
          const application = res.data.data[0];
          setApplicationData(application);
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
      } else {
        console.log("No Id available");
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    }
  };

  useEffect(() => {
    const savedCourseId = sessionStorage.getItem("course_id");
    if (savedCourseId) {
      dispatch(setCourseId(Number(savedCourseId)));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchmyapplication();
  }, [id]);

  useEffect(() => {
    const amount =
      currency === "USD"
        ? Number(applicationData.usd_amount) /
          Number(applicationData.installment)
        : Number(applicationData.naira_amount) /
          Number(applicationData.installment);

    const formattedValue = formatToCurrency(
      amount,
      currency === "USD" ? "USD" : "NGN"
    );

    setFormattedAmount(formattedValue);
  }, [
    currency,
    applicationData.usd_amount,
    applicationData.naira_amount,
    applicationData.installment,
  ]);

  useEffect(() => {
    let amount;
    if (currency === "USD") {
      amount = Number(applicationData.usd_amount);
    } else {
      amount = Number(applicationData.naira_amount);
    }

    // Format the amount before setting it in state
    const formattedAmount = formatToCurrency(
      amount,
      currency === "USD" ? "USD" : "NGN"
    );

    setSelectedAmount(formattedAmount);
  }, [currency, applicationData.usd_amount, applicationData.naira_amount]);

  return (
    <DashboardArea>
      <div className="shadow-md flex justify-center items-center rounded-[12px] w-full h-full py-12">
        <div className="w-full lg:w-[80%] ">
          <p className=" mb-6 font-DMSans text-[24px] font-semibold">Payment</p>
          <div className=" lg:w-[90%]">
            <p className="text-left capitalize font-DMSans text-[20px] font-semibold">
              {applicationData.course_title}
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
                Choose A Payment Plan
              </p>
              <div className="w-full lg:w-[399px]">
                <SelectionDropdown
                  options={PaymentPlan}
                  onSelect={handleSelect}
                />
              </div>
              <div className="flex items-center justify-start gap-4 my-4">
                <p className="text-[#7F7F7F] font-DMSans text-[18px] font-semibold">
                  Pay in
                </p>
                <label className="flex items-center cursor-pointer">
                  <span className="mr-2 text-[16px] font-semibold font-DMSans">
                    NGN
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={currency === "USD"}
                    onChange={toggleCurrency}
                  />
                  <span className="ml-2 text-[16px] font-semibold font-DMSans">
                    USD
                  </span>
                </label>
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
                      <th>Payment Plan</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {/* row 1 */}
                    <tr className="font-semibold font-DMSans">
                      <th>{applicationData.course_title}</th>
                      {paymentPlan === 1 ? (
                        <td>Full Payment</td>
                      ) : (
                        <td>
                          {applicationData.installment}{" "}
                          {applicationData.program_plan === "1"
                            ? "Month"
                            : "Split"}{" "}
                          Inst
                        </td>
                      )}
                      {paymentPlan === 1 ? (
                        <td>
                          {currency === "USD"
                            ? formatToCurrency(
                                Number(applicationData.usd_amount),
                                "USD"
                              )
                            : formatToCurrency(
                                Number(applicationData.naira_amount),
                                "NGN"
                              )}
                        </td>
                      ) : (
                        <td>
                          {currency === "USD"
                            ? formatToCurrency(
                                Number(applicationData.usd_amount) /
                                  Number(applicationData.installment),
                                "USD"
                              )
                            : formatToCurrency(
                                Number(applicationData.naira_amount) /
                                  Number(applicationData.installment),
                                "NGN"
                              )}
                        </td>
                      )}
                    </tr>
                    {/* row 2 */}
                    <tr className="font-semibold font-DMSans">
                      <th></th>
                      <td>Discount</td>
                      <td>0.00</td>
                    </tr>
                    {paymentPlan === 2 && (
                      <tr className="font-bold font-DMSans text-[16px]">
                        <th></th>
                        <td>Inst</td>
                        <td>{formattedAmount}</td>
                      </tr>
                    )}
                    <tr className="font-bold font-DMSans text-[16px]">
                      <th></th>
                      <td>Total Amount</td>
                      <td>{selectedAmount}</td>
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
              <input
                type="checkbox"
                id="termsCheckbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="checkbox checkbox-success [--chkbg:theme(colors.green.600)] [--chkfg:white]"
              />
              <p className="text-[#7F7F7F] text-left font-DMSans text-[15px] font-semibold">
                I hereby accept the{" "}
                <span className="text-[#F01E00]">
                  enrollment payment terms & conditions
                </span>
              </p>
            </div>

            <BaseButton
              containerCLassName={cn(
                `mt-4 h-[49px] w-full lg:w-[280px] rounded-[8px] bg-[#FF3B30] text-[16px] font-bold font-DMSans text-[#fff]`,
                !isChecked ? "opacity-50 cursor-not-allowed" : ""
              )}
              hoverScale={1.01}
              hoverOpacity={0.8}
              tapScale={0.9}
              onClick={handlePayment}
              disabled={!isChecked}
            >
              <p>Proceed with payment</p>
            </BaseButton>
          </div>
        </div>
      </div>
      <NewPaymentModal
        fullAmount={selectedAmount}
        paymentPlan={paymentPlan}
        formattedAmount={formattedAmount}
        applicationId={newPayment.applicationid}
        currency={currency}
        isOpen={newPayment.status}
        closeModal={handleClose}
      />
    </DashboardArea>
  );
};

export default Payment;
