import { BaseModal } from "./BaseModal";
import { useCallback, useEffect, useState } from "react";
import { MdOutlinePayments } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { cn } from "~/utils/helpers";
import { ROUTES } from "../constants/routes";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "~/redux-store/store";
import { CourseServices } from "~/api/course";
import { LoadingSpinner } from "../ui/loading-spinner";

interface IModalPropsType {
  applicationId: number;
  isOpen: boolean;
  closeModal: () => void;
}

export const NewPaymentModal = ({
  applicationId,
  isOpen,
  closeModal,
}: IModalPropsType) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [applicationData, setApplicationData] = useState({
    naira_amount: 0,
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
  });

  const fetchmyapplication = async () => {
    setLoading(true);
    try {
      const payload = {
        applicationid: applicationId,
      };
      const res = await CourseServices.fetchSingleApplication(payload);

      if (res.data && res.data.data && res.data.data.length > 0) {
        const application = res.data.data[0];
        setApplicationData(application);
        setLoading(false);
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
    navigate(ROUTES.BANKTRANSFER);
  };

  useEffect(() => {
    fetchmyapplication();
  }, [user]);

  const config = {
    public_key: "FLWPUBK_TEST-512e73fbe507f41f6ebbdd13dcc57537-X",
    tx_ref: Date.now().toString(),
    // amount: applicationData.naira_amount,
    amount: 500,
    currency: "NGN",
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
      console.log(response);
      closePaymentModal();
    },
    onClose: () => {},
  };

  return (
    <BaseModal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex w-full lg:w-[514px] h-auto p-6 flex-col items-center justify-center">
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
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <LoadingSpinner size="xs" />
              </div>
            ) : (
              <FlutterWaveButton
                {...fwConfig}
                className={cn(
                  "rounded-md p-2 font-semibold font-DMSans h-full w-full text-[#fff] hover:bg-[#6440FB]/60"
                )}
              />
            )}
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
