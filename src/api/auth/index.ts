import { Api } from "~/utils/axios";
import { BaseAPIService } from "../base";
import {
  ApplicationFormPayload,
  ApplicationOTPFormPayload,
  AuthFormPayload,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  ResendOTPPayload,
} from "~/feature/students/schema";
import { TypeIs } from "~/utils/packages/type-is";

export class AuthService extends BaseAPIService {
  static verificationcode = async (payload: ApplicationFormPayload) => {
    try {
      type APPLICATIONAUTH = OTPsentResponse;
      const res = await Api.post<APPLICATIONAUTH>("/application", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static validateOTP = async (payload: ApplicationOTPFormPayload) => {
    try {
      type APPLICATIONOTP = APIResponse<VALIDATEOTPResponse>;
      const res = await Api.post<APPLICATIONOTP>("/validate-otp", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
  static resendOTP = async (payload: ResendOTPPayload) => {
    try {
      type APPLICATIONOTP = APIResponse<VALIDATEOTPResponse>;
      const res = await Api.post<APPLICATIONOTP>("/resend-otp", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static continueApplication = async (payload: FormData) => {
    try {
      type APPLICATIONRES = APPLICATION;
      const res = await Api.post<APPLICATIONRES>(
        "/continue-application",
        payload
      );
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
  static subsequentApplication = async (payload: FormData) => {
    try {
      type APPLICATIONRES = APPLICATION;
      const res = await Api.post<APPLICATIONRES>(
        "/subsequent-application",
        payload
      );
      console.log(res);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static login = async (payload: AuthFormPayload) => {
    try {
      type LOGIN = LoginResponse;
      const res = await Api.post<LOGIN>("/login", payload);
      this.storeUser(
        TypeIs.any({
          user: JSON.stringify(res.data.profile[0].userid),
          token: res.data.token,
        })
      );
      const userData = res.data;
      return { userData };
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
  static forgotpassword = async (payload: ForgotPasswordPayload) => {
    try {
      type LOGIN = LoginResponse;
      const res = await Api.post<LOGIN>("/forgot-password", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
  static changepassword = async (payload: ChangePasswordPayload) => {
    try {
      type LOGIN = LoginResponse;
      const res = await Api.post<LOGIN>("/reset-password", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static getSession = this.handleUserSession;
}
