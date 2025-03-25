import { useTheme } from "~/context/theme-provider";
import { DashboardArea } from "~/layouts/DashboardArea";
import { cn } from "~/utils/helpers";
import { MdContentCopy } from "react-icons/md";
import { BaseButton } from "~/components/buttons/BaseButton";
import { IoArrowBack } from "react-icons/io5";
import useCountdown from "~/hooks/useCountdown";
import { useEffect, useState } from "react";
import { BaseInput } from "~/components/data-inputs/text-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransferFormPayload, transferSchema } from "~/feature/students/schema";
import { Validator } from "~/utils/packages/validators";
import { SucessModal } from "~/components/Modal/SucessModal";
import { CourseServices } from "~/api/course";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

const fields = [
  {
    name: "bankName" as const,
    placeholder: "Enter Bank Name",
    label: "Which bank did you pay from?",
    type: "text",
  },
  {
    name: "bankAccount" as const,
    placeholder: "Enter Bank Account",
    label: "What is the bank's account number?",
    type: "text",
  },
  {
    name: "amount" as const,
    placeholder: "Enter Amount",
    label: "How much did you pay?",
    type: "text",
  },
];

const BankTransfer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentPlan, fullAmount, formattedAmount, Paymeny_currency } =
    location.state || {};
  const [isAmount, setisAmount] = useState(0);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    if (Paymeny_currency === "NGN" && paymentPlan === 1) {
      setCurrency("NGN");
      setisAmount(fullAmount);
    }

    if (Paymeny_currency === "USD" && paymentPlan === 1) {
      setCurrency("USD");
      setisAmount(fullAmount);
    }
    if (Paymeny_currency === "NGN" && paymentPlan === 2) {
      setCurrency("NGN");
      setisAmount(formattedAmount);
    }

    if (Paymeny_currency === "USD" && paymentPlan === 2) {
      setCurrency("USD");
      setisAmount(formattedAmount);
    }
  }, []);

  const { id } = useParams();
  const [IsFormSubmitted, setIsFormSubmitted] = useState({
    status: false,
    message: "",
  });
  const form = useForm<TransferFormPayload>({
    resolver: zodResolver(transferSchema),
    mode: "onChange",
  });
  const { unWrapErrors } = Validator.reactHookHandler(form.formState);
  const [ismadeTransfer, isismadeTransfer] = useState(false);
  const { theme } = useTheme();
  const { minutes, seconds, startCountdown, resetCountdown } = useCountdown(
    30,
    30
  );
  const [applicationData, setApplicationData] = useState({
    applicationid: 0,
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

  const fetchmyapplication = async () => {
    try {
      if (id) {
        const payload = {
          applicationid: id,
        };
        const res = await CourseServices.fetchSingleApplication(payload);
        if (res.data && res.data.data && res.data.data.length > 0) {
          const application = res.data.data[0];
          setApplicationData(application);
        }
      } else {
        console.log("No application Id Set");
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    }
  };

  const submitPayment = async (payload: any) => {
    try {
      const res = await CourseServices.submitPayment(payload);
      if (res?.data?.success === true) {
        setIsFormSubmitted({
          status: true,
          message:
            "Thank you for confirming. Our team will get back to you within 72 hours",
        });
      } else {
        console.log("success not true");
      }
    } catch (error) {
      console.error("Error submiting payment:", error);
    }
  };

  useEffect(() => {
    fetchmyapplication();
  }, [id]);

  useEffect(() => {
    startCountdown();
  }, [minutes, seconds, resetCountdown, id]);

  const handleTransfered = () => {
    isismadeTransfer(true);
  };

  const handleSubmit = (data: TransferFormPayload) => {
    submitPayment({
      application_id: applicationData?.applicationid,
      customer_name: `${applicationData?.firstname} ${applicationData?.lastname} `,
      email: applicationData?.email,
      phone_number:
        applicationData?.phone === null ? "" : applicationData?.phone,
      bank_name: data.bankName,
      account_number: data.bankAccount,
      amount: data.amount,
    });
  };

  const handleClose = () => {
    setIsFormSubmitted({
      status: false,
      message: "",
    });
  };

  return (
    <DashboardArea>
      <button
        onClick={() => navigate(-1)}
        className="bg-[#6440FB]/10 hover:shadow-md flex justify-between items-center gap-2 p-2 rounded-sm"
      >
        <IoArrowBack className="text-[#6440FB]" />
        <p className="text-[14px] font-DMSans font-semibold text-left text-[#6440FB]">
          Back
        </p>
      </button>
      <div className="w-full flex-col flex justify-center items-center">
        {ismadeTransfer ? (
          <div
            className={cn(
              "p-10 w-full lg:w-[660px] flex flex-col justify-start items-center shadow-lg rounded-lg",
              theme === "dark" ? "bg-[#333]" : "bg-[#C7CEFF] "
            )}
          >
            <div className="w-full mt-4 flex flex-col justify-start items-start">
              {fields.map((field) => (
                <BaseInput
                  key={field.name}
                  {...field}
                  labelClassName="text-[#140342] mt-4 text-[18px] font-bold font-DMSans"
                  containerClassname="w-full"
                  inputContainerClassName="bg-[#fff]"
                  {...form.register(field.name)}
                  error={unWrapErrors(field.name)}
                />
              ))}
            </div>
            <BaseButton
              containerCLassName={cn(
                "mt-4 h-[66px] w-full rounded-[8px] bg-[#6440FB] text-[16px] font-bold font-DMSans text-[#fff]",
                !form.formState.isValid || form.formState.isSubmitting
                  ? "cursor-not-allowed opacity-50"
                  : ""
              )}
              hoverScale={1.01}
              hoverOpacity={0.8}
              tapScale={0.9}
              onClick={form.handleSubmit(handleSubmit)}
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              loading={form.formState.isSubmitting}
            >
              <p>Submit</p>
            </BaseButton>
          </div>
        ) : (
          <div
            className={cn(
              "p-10 w-full lg:w-[660px] flex flex-col justify-start items-center shadow-lg rounded-lg",
              theme === "dark" ? "bg-[#333]" : "bg-[#FFFFFF] "
            )}
          >
            <h2 className="text-[28.69px] text-center font-DMSans font-semibold">
              Direct Bank Transfer/Deposit
            </h2>
            {!currency ? (
              <div>
                <LoadingSpinner />
              </div>
            ) : (
              <p className="text-[18px] text-center font-DMSans font-semibold">
                Pay or transfer the sum of{" "}
                <span className="text-[#6440FB]">{isAmount}</span> to the
                following account details:
              </p>
            )}
            <div className="w-[391px] flex justify-between items-center p-2 bg-[#6440FB]">
              <p className="text-[18px] font-DMSans font-normal text-left text-[#fff]">
                Account Number: 20009837694
              </p>
              <MdContentCopy className="text-[#fff] text-[25px]" />
            </div>
            <div className="">
              <p className="text-[18px] my-2 font-DMSans font-normal text-left">
                <span className="font-bold">Account name:</span> Fordax Business
                School
              </p>
              <p className="text-[18px] my-2 font-DMSans font-normal text-left">
                <span className="font-bold">Bank name: </span>First City
                Monument Bank (FCMB)
              </p>
            </div>
            <div className="w-[391px] flex justify-between items-center p-2 bg-[#6440FB]">
              <p className="text-[18px] font-DMSans font-normal text-left text-[#fff]">
                Narration/ Ref.: MBA_05_2025
              </p>
              <MdContentCopy className="text-[#fff] text-[25px]" />
            </div>
            <p className="text-[18px] my-2 font-DMSans font-normal text-left">
              This payment option is valid for {minutes} : {seconds}
            </p>
            <BaseButton
              containerCLassName="mt-4 h-[66px] w-full lg:w-[393px] rounded-[8px] bg-[#6440FB] text-[16px] font-bold font-DMSans text-[#fff]"
              hoverScale={1.01}
              hoverOpacity={0.8}
              tapScale={0.9}
              onClick={handleTransfered}
            >
              <p>I have made payment</p>
            </BaseButton>
            <p className="text-[14px] w-full lg:w-[393px]  text-[#F01E00] my-2 font-DMSans font-semibold text-center">
              Please do not click "I have made payment" until you confirm that
              the payment is successful.
            </p>
          </div>
        )}
      </div>
      <SucessModal
        isOpen={IsFormSubmitted.status}
        message={IsFormSubmitted.message}
        closeModal={handleClose}
      />
    </DashboardArea>
  );
};

export default BankTransfer;
