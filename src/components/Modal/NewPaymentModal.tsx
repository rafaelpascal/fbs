import { BaseModal } from "./BaseModal";
import { useCallback, useEffect, useState } from "react";
import { MdOutlinePayments } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { cn } from "~/utils/helpers";
import { ROUTES } from "../constants/routes";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { useNavigate } from "react-router-dom";
import { CourseServices } from "~/api/course";

interface IModalPropsType {
  fullAmount: string;
  formattedAmount: string;
  paymentPlan: number;
  applicationId: number;
  currency: string;
  isOpen: boolean;
  closeModal: () => void;
}

export const NewPaymentModal = ({
  fullAmount,
  formattedAmount,
  paymentPlan,
  currency,
  applicationId,
  isOpen,
  closeModal,
}: IModalPropsType) => {
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState({
    applicationid: 0.5,
    naira_amount: 0,
    usd_amount: 0,
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    installment: "",
  });

  const fetchmyapplication = async () => {
    try {
      if (applicationId) {
        const payload = {
          applicationid: applicationId,
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
  // Close modal
  const handleclose = useCallback(() => {
    closeModal();
  }, []);

  const handleBankTransfer = () => {
    navigate(`/banktransfer/${applicationData.applicationid}`, {
      state: {
        formattedAmount: formattedAmount,
        fullAmount: fullAmount,
        paymentPlan: paymentPlan,
        Paymeny_currency: currency,
      },
    });
  };

  useEffect(() => {
    fetchmyapplication();
  }, [applicationId]);

  const sendResponseToBackend = async (flutterwave_response: any) => {
    try {
      const payload = {
        payment_details: {
          ...flutterwave_response,
          application_id: applicationData.applicationid,
        },
      };
      const response = await CourseServices.submitFluterres(payload);
      if (response.data.success === true) {
        navigate(ROUTES.DASHBOARD, { state: { enrolled: true } });
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const config = {
    // public_key: "FLWPUBK_TEST-512e73fbe507f41f6ebbdd13dcc57537-X",
    public_key: "FLWPUBK-70d168a179166f3222d4254ab3e40769-X",
    tx_ref: Date.now().toString(),
    amount:
      paymentPlan === 2
        ? formattedAmount
          ? parseFloat(formattedAmount.replace(/[^\d.-]/g, ""))
          : 0
        : fullAmount
        ? parseFloat(fullAmount.replace(/[^\d.-]/g, ""))
        : 0,
    // amount: 500,
    currency: currency,
    payment_options: "card,mobilemoney,ussd",
    //  redirect_url: "https://yourwebsite.com/payment-success",
    customer: {
      email: applicationData.email,
      phone_number: applicationData.phone,
      name: `${applicationData.firstname} ${applicationData.lastname}`,
    },
    customizations: {
      title: "My store",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with your bank card using Flutterwave",
    callback: (response: any) => {
      sendResponseToBackend(response);
      closePaymentModal();
      closeModal();
    },
    onClose: () => {},
  };
  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:max-w-[514px]"
    >
      <div className="flex w-full h-auto p-6 flex-col items-center justify-center">
        <div className="w-full flex justify-end items-center">
          <div className="flex justify-between items-start w-full lg:w-[55%]">
            <div className="h-[80px] w-[80px] bg-slate-300 rounded-full flex justify-center items-center">
              <div className="h-[50px] w-[50px] bg-slate-400 rounded-full flex justify-center items-center">
                <MdOutlinePayments className="text-[25px]" />
              </div>
            </div>
            <button onClick={handleclose}>
              <MdCancel className="text-[20px]" />
            </button>
          </div>
        </div>
        <div className="w-full flexm mt-4 justify-center items-center flex-col">
          <h2 className="text-[20px] mb-4 text-center font-DMSans font-bold">
            Proceed to payment
          </h2>
          <p className="text-[16px] text-center font-DMSans font-normal ">
            You can choose any of this option to complete your payment.
          </p>
        </div>
        <div className="flex gap-4 p-4 justify-between items-center">
          <div className="w-[50%] h-[100px] rounded-md  bg-[#6440FB]">
            <FlutterWaveButton
              {...fwConfig}
              className={cn(
                "rounded-md p-2 font-semibold font-DMSans h-full w-full text-[#fff] hover:bg-[#6440FB]/60"
              )}
            />
          </div>

          <button
            onClick={handleBankTransfer}
            className={cn(
              "rounded-md p-2 w-[50%] h-[100px] bg-[#6440FB] text-[#fff] hover:bg-[#6440FB]/60"
            )}
          >
            <p className="font-DMSans text-[14px] font-semibold items-center">
              Bank Transfer{" "}
            </p>
            <p className="font-DMSans text-[14px] font-semibold items-center">
              Transfer or deposit directly to Fordax
            </p>
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
