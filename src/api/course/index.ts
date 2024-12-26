import { Api } from "~/utils/axios";
import { BaseAPIService } from "../base";

export class CourseServices extends BaseAPIService {
  static paymentPlans = async (): Promise<PaymentPlanResponse> => {
    try {
      const res = await Api.get<PaymentPlanResponse>("/list-payment-plan");
      return res.data;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
}
