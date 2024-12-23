import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

// Sweet alert
export const showAlert = (
  icon: SweetAlertIcon,
  title: string,
  text: string,
  confirmButtonText: string,
  iconColor: string,
  onConfirm?: () => void
): Promise<SweetAlertResult<void>> => {
  return Swal.fire({
    icon,
    title,
    text,
    showConfirmButton: true,
    width: 400,
    confirmButtonText,
    iconColor,
    customClass: {
      popup: "custom-popup",
      title: "custom-title",
      confirmButton: "custom-confirm-button",
    },
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    }
    return result;
  });
};
