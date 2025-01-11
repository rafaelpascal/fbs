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

  static fetchApplication = async (payload: any) => {
    try {
      const res = await Api.post("/fetch-application", payload);
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

  static createCourseCohort = async (payload: any) => {
    try {
      const res = await Api.post("/create-cohort", payload);
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

  static getCourse = async (payload: any) => {
    try {
      const res = await Api.post("/course/list-course-title-id", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static listCourses = async (): Promise<any> => {
    try {
      const res = await Api.get<any>("/course/list-courses");
      return res.data;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
}
