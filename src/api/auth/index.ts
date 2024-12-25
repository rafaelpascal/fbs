import { Api } from "~/utils/axios";
import { BaseAPIService } from "../base";
import {
  ApplicationFormPayload,
  ApplicationOTPFormPayload,
} from "~/feature/students/schema";

export class AuthService extends BaseAPIService {
  static verificationcode = async (payload: ApplicationFormPayload) => {
    try {
      type APPLICATIONAUTH = APIResponse<OTPsentResponse>;
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
}
