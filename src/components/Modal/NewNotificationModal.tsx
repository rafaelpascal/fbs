import { BaseModal } from "./BaseModal";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import { BaseInput } from "../data-inputs/text-input";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useForm } from "react-hook-form";
import {
  CretaNotificationPayload,
  cretaNotificationSchema,
} from "~/feature/students/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Validator } from "~/utils/packages/validators";
import { fetchSystemUser } from "~/api/course/hooks";
import { CourseServices } from "~/api/course";

interface IModalPropsType {
  id?: number;
  isOpen: boolean;
  closeModal: () => void;
  handlecreate: () => void;
}

const fields = [
  {
    name: "title" as const,
    placeholder: "Enter Notification title",
    label: "Notification Title",
    type: "text",
    compulsory: true,
  },
  {
    name: "message" as const,
    placeholder: "Type Notification",
    label: "Notification",
    type: "textarea",
    compulsory: true,
  },
];

export const NewNotificationModal = ({
  id,
  handlecreate,
  isOpen,
  closeModal,
}: IModalPropsType) => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isLoading] = useState(false);
  const { data: systemUsers } = fetchSystemUser();
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [isDropdownOpen, setDropDownIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropDownIsOpen((prev) => !prev);

  const handleSelect = (userid: number | string) => {
    const numericUserId =
      typeof userid === "string" ? parseInt(userid, 10) : userid;
    setSelectedUserIds((prevSelected) =>
      prevSelected.includes(numericUserId)
        ? prevSelected.filter((id) => id !== numericUserId)
        : [...prevSelected, numericUserId]
    );
  };

  const form = useForm<CretaNotificationPayload>({
    resolver: zodResolver(cretaNotificationSchema),
    mode: "onChange",
  });
  const { unWrapErrors } = Validator.reactHookHandler(form.formState);
  // Close modal
  const handleclose = useCallback(() => {
    closeModal();
    setSelectedUserIds([]);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setisSubmitting(true);

    try {
      const isValid = await form.trigger();
      if (!isValid) {
        setisSubmitting(false);
        return;
      }

      const formValues = form.getValues();

      const payload = {
        title: formValues.title,
        message: formValues.message,
        userid: 68,
        // userIds: selectedUserIds,
      };
      const res = await CourseServices.sendNotifications(payload);
      console.log(res);

      form.reset();
      closeModal();
      handlecreate();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setisSubmitting(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropDownIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:min-w-[500px] "
    >
      <div className="w-full flex px-2 justify-between items-center bg-[#b8b6b6] py-3">
        <h2 className="font-DMSans text-[#fff] text-[18px] font-semibold text-center">
          Send Notification to User/Users
        </h2>
        <button onClick={handleclose}>
          <MdCancel className="text-[30px] text-[#F01E00]" />
        </button>
      </div>
      {isLoading ? (
        <div className="flex w-full p-6 flex-col items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex w-full lg:w-[500px] scrollbar-style overflow-y-auto p-2 lg:p-6 flex-col items-start justify-start">
          <div className="w-full mb-4 max-w-md relative" ref={dropdownRef}>
            <label className="block text-[14px] font-DMSans font-semibold mb-1">
              Select Users
            </label>
            <button
              onClick={toggleDropdown}
              className="w-full px-3 py-2 font-DMSans text-sm font-normal border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring focus:border-blue-500"
            >
              {selectedUserIds.length === 0
                ? "Select users..."
                : `${selectedUserIds.length} user(s) selected`}
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {systemUsers?.data?.map((user: any) => {
                  const userIdNum = Number(user.user_id || user.userid);
                  if (isNaN(userIdNum)) return null;
                  return (
                    <label
                      key={userIdNum}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(userIdNum)}
                        onChange={() => handleSelect(userIdNum)}
                        className="mr-2 checkbox checkbox-xs"
                      />
                      {user.firstname} {user.lastname}
                    </label>
                  );
                })}
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-4 justify-center items-center">
            {fields.map((field) => (
              <BaseInput
                key={field.name}
                {...field}
                labelClassName="text-[14px] font-DMSans font-semibold"
                containerClassname="w-full"
                {...form.register(field.name)}
                error={unWrapErrors(field.name)}
              />
            ))}
          </div>
          <div className="flex mt-4 justify-start items-start gap-4">
            <button
              onClick={handleSubmit}
              className=" text-[#fff] px-2 font-semibold flex justify-center items-center gap-2 text-[18px] font-DMSans py-2 bg-[#F01E00] rounded-[4px]"
            >
              <p className="font-DMSans font-semibold text-[16px] text-white">
                {id ? "Edit Notification" : "Send Notification"}
              </p>
              {isSubmitting && <LoadingSpinner size="xs" />}
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  );
};
