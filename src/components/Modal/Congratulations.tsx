import { BaseModal } from "./BaseModal";
import { BsPatchCheckFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

interface IModalPropsType {
  isOpen: boolean;
  closeModal: () => void;
}

export const Congratulations = ({ isOpen, closeModal }: IModalPropsType) => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    if (countdown === 0) {
      navigate(ROUTES.CONGRATULATIONS);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen, countdown, navigate]);

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:min-w-[394px]"
    >
      <div className="flex w-full h-auto flex-col items-center justify-center">
        <div className="flex bg-[#ddd] p-2 justify-between mb-4 items-center w-full">
          <p className="font-DMSans text-center w-full font-normal text-[20px] text-[#36812A]">
            Congratulations
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <BsPatchCheckFill className="size-16 text-[#36812A]" />
          <h2 className="text-2xl font-bold text-center text-[#36812A]">
            Quiz completed Successfully
          </h2>
          <p className="text-lg text-center w-full font-semibold lg:w-[50%]">
            You have successfully completed your quiz. You will be redirected in{" "}
            <span className="text-[#36812A]">{countdown}</span> seconds.
          </p>
        </div>
      </div>
    </BaseModal>
  );
};
