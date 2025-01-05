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

  static createCourse = async (payload: FormData) => {
    try {
      const res = await Api.post("/create-courses", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static createCourseRequirements = async (payload: any) => {
    try {
      const res = await Api.post("/create-course-requirements", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static createCourseModule = async (payload: any) => {
    try {
      const res = await Api.post("/create-modules", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static createCourseLesson = async (payload: FormData) => {
    try {
      const res = await Api.post("/create-lessons", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static createFormRequirements = async (payload: any) => {
    try {
      const res = await Api.post("/create-form-requirements", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static formRequirements = async (): Promise<FormRequirementsResponse> => {
    try {
      const res = await Api.get<FormRequirementsResponse>(
        "/list-form-requirements"
      );
      return res.data;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
}
