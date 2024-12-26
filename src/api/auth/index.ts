import { Api } from "~/utils/axios";
import { BaseAPIService } from "../base";
import {
  ApplicationFormPayload,
  ApplicationOTPFormPayload,
  AuthFormPayload,
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

  static login = async (payload: AuthFormPayload) => {
    try {
      type LOGIN = LoginResponse;
      const res = await Api.post<LOGIN>("/login", payload);
      this.storeUser(
        TypeIs.any({
          user: res.data.token,
        })
      );
      const userData = res.data;
      return { userData };
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
}
