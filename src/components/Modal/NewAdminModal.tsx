import { BaseModal } from "./BaseModal";
import { useCallback, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { cn } from "~/utils/helpers";
// import { ROUTES } from "../constants/routes";
// import { useNavigate } from "react-router-dom";
import { BaseInput } from "../data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import { LoadingSpinner } from "../ui/loading-spinner";
import ImageUpload from "../data-inputs/ImageUpload";
import { useForm } from "react-hook-form";
import {
  CreateAdminFormPayload,
  createAdminSchema,
} from "~/feature/students/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Validator } from "~/utils/packages/validators";
import SelectionDropdown from "../Collapsible/SelectionDropdown";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { CourseServices } from "~/api/course";
// import { CourseServices } from "~/api/course";

interface IModalPropsType {
  id?: number;
  isOpen: boolean;
  closeModal: () => void;
  handlecreate: () => void;
}

interface FormData {
  program: null | { label: string; value: number } | null;
  roles: null | { label: string; value: number } | null;
  description: string;
  linkedin: string;
  facebook: string;
  featuredImages: File[];
}

const roles = [
  { label: "Admin", value: 1 },
  { label: "User", value: 2 },
];

const programs = [
  { label: "MBA", value: 1 },
  { label: "DBA", value: 2 },
  { label: "EDBA", value: 3 },
];

const fields = [
  {
    name: "firstname" as const,
    placeholder: "Enter First name",
    label: "First name",
    type: "text",
    compulsory: true,
  },
  {
    name: "lastname" as const,
    placeholder: "Enter Last name/Surname",
    label: "Last name/Surname",
    type: "text",
    compulsory: true,
  },
  {
    name: "othernames" as const,
    placeholder: "Enter Other names",
    label: "Other names",
    type: "text",
  },
  {
    name: "email_address" as const,
    placeholder: "Enter Email",
    label: "Email Address",
    type: "email",
    compulsory: true,
  },
  {
    name: "phone_number" as const,
    placeholder: "Enter Phone Number",
    label: "Phone number",
    type: "phone",
    compulsory: true,
  },
  {
    name: "temp_password" as const,
    placeholder: "Enter Password",
    label: "Default Password",
    type: "password",
    compulsory: true,
  },
];

export const NewAdminModal = ({
  id,
  handlecreate,
  isOpen,
  closeModal,
}: IModalPropsType) => {
  const { theme } = useTheme();
  const [isSubmitting, setisSubmitting] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(false);
  const form = useForm<CreateAdminFormPayload>({
    resolver: zodResolver(createAdminSchema),
    mode: "onChange",
  });
  const { unWrapErrors } = Validator.reactHookHandler(form.formState);
  //   const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    program: null,
    roles: null,
    description: "",
    linkedin: "",
    facebook: "",
    featuredImages: [],
  });
  // Close modal
  const handleclose = useCallback(() => {
    closeModal();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelect = (
    field: string,
    option: { label: string; value: string | number }
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: option,
    }));
  };

  useEffect(() => {
    if (!id) return;
    fetchAdmin();
  }, [id]);

  const fetchAdmin = async () => {
    setLoading(true);
    try {
      const payload = { userid: id };
      const res = await CourseServices.getUserbyId(payload);

      if (res?.data?.data?.length > 0) {
        const admin = res.data.data[0];
        setUserId(admin.user_id);
        // Update form fields
        form.reset({
          firstname: admin.firstname || "",
          lastname: admin.lastname || "",
          othernames: admin.othernames || "",
          email_address: admin.email || "",
          phone_number: admin.phone || "",
          temp_password: "**********",
        });

        // Update custom form state
        setFormData({
          program: programs.find((p) => p.value === admin.program_id) || null,
          roles: roles.find((r) => r.value === admin.user_role) || null,
          description: admin.description || "",
          linkedin: admin.linkedin || "",
          facebook: admin.facebook || "",
          featuredImages: admin.passport_image_url || [],
        });
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      featuredImages: files,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setisSubmitting(true);

    try {
      const isValid = await form.trigger();
      if (!isValid) {
        setisSubmitting(false);
        return;
      }

      // Collect values from React Hook Form
      const formValues = form.getValues();

      // Create a new FormData instance
      const formDataToSend = new FormData();

      // Append React Hook Form values
      Object.entries(formValues).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formDataToSend.append(key, value as string);
        }
      });

      // Append additional formData values
      if (formData.program?.label)
        formDataToSend.append("program", formData.program.label);
      if (formData.roles?.value)
        formDataToSend.append("user_role", String(formData.roles.value));
      if (formData.description)
        formDataToSend.append("description", formData.description);
      if (formData.linkedin)
        formDataToSend.append("linkedin", formData.linkedin);
      if (formData.facebook)
        formDataToSend.append("facebook", formData.facebook);

      if (Array.isArray(formData.featuredImages)) {
        formData.featuredImages.forEach((file) => {
          formDataToSend.append("post_passport", file);
        });
      } else if (typeof formData.featuredImages === "string") {
        formDataToSend.append("post_passport", formData.featuredImages);
      } else {
        console.error(
          "featuredImages is neither an array nor a string:",
          formData.featuredImages
        );
      }
      if (id) {
        formDataToSend.append("userid", String(userId));
      }
      if (id) {
        const res = await CourseServices.updateAdmin(formDataToSend);
        console.log("updated", res);
      } else {
        await CourseServices.createAdmin(formDataToSend);
      }
      form.reset();
      setFormData({
        program: null,
        roles: null,
        description: "",
        linkedin: "",
        facebook: "",
        featuredImages: [],
      });

      closeModal();
      handlecreate();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:min-w-[1000px] "
    >
      <div className="w-full flex px-2 justify-between items-center bg-[#b8b6b6] py-3">
        <h2 className="font-DMSans text-[#fff] text-[18px] font-semibold text-center">
          ADD ADMINISTRATOR/FACULTY/ETC
        </h2>
        <button onClick={handleclose}>
          <MdCancel className="text-[30px] text-[#F01E00]" />
        </button>
      </div>
      {isLoading ? (
        <div className="flex w-full h-[600px] p-6 flex-col items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex w-full h-[600px] lg:w-[1000px] scrollbar-style overflow-y-auto p-2 lg:p-6 flex-col items-start justify-start">
          <div>
            <h2 className="text-[17px] font-DMSans font-semibold">
              PROFILE IMAGE
            </h2>
            <ImageUpload
              onUpload={handleImageUpload}
              initialImages={formData.featuredImages}
            />
          </div>
          <div className="w-full mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
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
          <div className="flex flex-col lg:flex-row flex-wrap w-full mt-2 justify-between items-center ">
            <div className="w-full lg:w-[49%] mb-4">
              <SelectionDropdown
                label="Work Roles"
                labelClassName="text-[14px] font-DMSans font-semibold mb-2"
                options={roles}
                onSelect={(option) => handleSelect("roles", option)}
                placeholder="Select Role"
                initialSelected={
                  formData.roles
                    ? {
                        label: formData.roles.label,
                        value: formData.roles.value,
                      }
                    : null
                }
              />
            </div>
            <div className="w-full lg:w-[49%] mb-4">
              <SelectionDropdown
                label="Programs"
                labelClassName="text-[14px] font-DMSans font-semibold mb-2"
                options={programs}
                onSelect={(option) => handleSelect("programs", option)}
                placeholder="Select Programs"
                initialSelected={
                  formData.program
                    ? {
                        label: formData.program.label,
                        value: formData.program.value,
                      }
                    : null
                }
              />
            </div>
          </div>
          <div className="mt-2 w-full">
            <BaseInput
              label="Description"
              type="textarea"
              placeholder="Description"
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[153px] ",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
              value={formData.description}
              onChange={(e: any) =>
                handleInputChange("description", e.target.value)
              }
            />
          </div>
          <div className="flex flex-col lg:flex-row flex-wrap w-full justify-between items-center">
            <div className="w-full flex justify-start mt-4 items-center gap-2 lg:w-[49%] border-[0.5px]  border-[#ddd] rounded-md px-2">
              <FaLinkedin className="text-[30px]" />
              <BaseInput
                type="text"
                placeholder=""
                containerClassname="w-full"
                labelClassName="text-[17px] font-DMSans font-semibold"
                inputContainerClassName={cn("h-[45px] border-[0px]")}
                value={formData.linkedin}
                onChange={(e: any) =>
                  handleInputChange("linkedin", e.target.value)
                }
              />
            </div>
            <div className="w-full flex justify-start mt-4 items-center gap-2 lg:w-[49%] border-[0.5px]  border-[#ddd] rounded-md px-2">
              <FaFacebook className="text-[30px]" />
              <BaseInput
                type="text"
                placeholder=""
                containerClassname="w-full"
                labelClassName="text-[17px] font-DMSans font-semibold"
                inputContainerClassName={cn("h-[45px] border-[0px]")}
                value={formData.facebook}
                onChange={(e: any) =>
                  handleInputChange("facebook", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex mt-4 justify-start items-start gap-4">
            <button
              onClick={handleclose}
              className="w-[100px] lg:w-[151px] text-[#fff] font-semibold text-[18px] font-DMSans py-2 bg-[#928d8d] rounded-[4px]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="w-[151px] text-[#fff] font-semibold flex justify-center items-center gap-2 text-[18px] font-DMSans py-2 bg-[#F01E00] rounded-[4px]"
            >
              <p className="font-DMSans font-semibold text-[16px] text-white">
                {id ? "Edit Record" : "Add Admin"}
              </p>
              {isSubmitting && <LoadingSpinner size="xs" />}
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  );
};
