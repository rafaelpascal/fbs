import { useState } from "react";
import { CourseServices } from "~/api/course";
import { fetchFormRequirements } from "~/api/course/hooks";
import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";
import { showAlert } from "~/utils/sweetAlert";

interface FormData {
  editors: null | { label: string; value: string | number };
}

type Editor = null | { label: string; value: string | number };

const FormRequirements = () => {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data } = fetchFormRequirements();
  const [formData, setFormData] = useState<FormData>({
    editors: null,
  });

  const [selectedEditors, setSelectedEditors] = useState<Editor[]>([]);

  const handleSelect = (
    field: string,
    option: { label: string; value: string | number }
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: option,
    }));
  };

  // const handleAddRequirement = () => {
  //   setIsSubmitting(true);
  //   if (formData.editors !== null) {
  //     setSelectedEditors((prev) => {
  //       const isDuplicate = prev.some(
  //         (editor) => editor?.value === formData.editors?.value
  //       );
  //       if (!isDuplicate) {
  //         return [...prev, formData.editors];
  //       }
  //       return prev;
  //     });
  //     setFormData({ editors: null });
  //     setIsSubmitting(false);
  //   }
  // };

  const handleAddRequirement = async () => {
    if (formData.editors === null) return;

    setIsSubmitting(true);

    // Prepare the payload
    const payload = {
      course_id: 10,
      requirement_text: formData.editors.label,
      requirements: transformedOptions?.find(
        (option) => option.value === formData.editors?.value
      )?.requirement,
    };

    try {
      const res = await CourseServices.createFormRequirements(payload);
      console.log(res);

      if (res.data.success === true) {
        await showAlert(
          "success",
          "Added!",
          "Form requirement added successfully!",
          "Ok",
          "#03435F"
        );
        // Update the selectedEditors state
        setSelectedEditors((prev) => {
          const isDuplicate = prev.some(
            (editor) => editor?.value === formData.editors?.value
          );
          if (!isDuplicate) {
            return [...prev, formData.editors];
          }
          return prev;
        });
        // Reset the form
        setFormData({ editors: null });
      } else {
        await showAlert(
          "error",
          "failed!",
          "Failed to add Form requirement.",
          "Ok",
          "#ED342B"
        );
        return;
      }
    } catch (error) {
      console.error("Error adding requirement:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const transformedOptions = data?.requirements?.map((req: any) => ({
    label: req.requirement_text,
    requirement: req.requirements,
    value: req.id,
  }));

  return (
    <div className="h-[400px] w-full lg:w-[50%] overflow-y-auto border-[0.5px] border-[#ddd] p-4 rounded-md">
      {selectedEditors.length > 0 && (
        <div className="my-4">
          <h4 className="font-DMSans font-semibold text-[16px] mb-2">
            Added Requirements:
          </h4>
          <ol className="list-decimal pl-5">
            {selectedEditors.map((editor) => (
              <li
                key={editor?.value}
                className={cn(
                  "font-DMSans font-semibold p-4 text-[14px]  mb-2",
                  theme === "dark"
                    ? "bg-[#333] shadow-md border-[0.5px] border-[#ddd]"
                    : "bg-slate-200"
                )}
              >
                {editor?.label}
              </li>
            ))}
          </ol>
        </div>
      )}
      {transformedOptions ? (
        <div className="w-full mb-4">
          <SelectionDropdown
            label="Form Requirements"
            labelClassName="text-[14px] font-DMSans font-semibold mb-2"
            options={transformedOptions}
            onSelect={(option) => handleSelect("editors", option)}
            placeholder="Select Form Requirements"
          />
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
      {formData.editors !== null && (
        <div
          className={cn(
            "mt-4 flex justify-between items-center w-full mb-4 rounded-md p-4",
            theme === "dark"
              ? "bg-[#333] shadow-md border-[0.5px] border-[#ddd]"
              : "bg-slate-300"
          )}
        >
          <p className="text-[17px] font-DMSans font-semibold">
            {formData.editors?.label || "None selected"}
          </p>
          <button
            onClick={handleAddRequirement}
            className="h-[40px] px-4 rounded-md flex justify-center items-center gap-2 bg-[#FF5050] text-white text-[14px] font-semibold"
          >
            <p className="font-DMSans font-semibold text-[16px] text-white">
              Add Requirement
            </p>
            {isSubmitting && <LoadingSpinner size="xs" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default FormRequirements;
