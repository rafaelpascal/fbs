import qs from "qs";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { AuthService } from "~/api/auth";

// Function to catch any axios error in th interceptor
const handleAxiosError = (error: AxiosError<ANY>) => {
  if (error.response) {
    return error.response.data.message;
  }
  if (error.request) {
    return `Bad Request: ${error.request}`;
  }
  return `Error: ${error.message}`;
};

/** use api as /api/name */
export const Api = axios.create({
  baseURL: apiUrl,
  paramsSerializer: (params) => qs.stringify(params, { encode: false }),
});

Api.interceptors.request.use((config) => {
  const user = AuthService.getSession();
  if (user) config.headers.Authorization = `Bearer ${user?.user}`;
  return config;
});

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = handleAxiosError(error);
    const AUTH_ERROR_CODES = [400, 401, 422, 404];
    const status = error?.response?.status;

    if (status && AUTH_ERROR_CODES.includes(status)) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: errorMessage,
        showConfirmButton: true,
        confirmButtonText: "Ok",
        iconColor: "#ED342B",
        customClass: {
          popup: "custom-popup",
          confirmButton: "custom-confirm-button",
        },
      }).then(() => {});

      return Promise.reject(new Error(errorMessage));
    }

    return Promise.reject(new Error(errorMessage));
  }
);
