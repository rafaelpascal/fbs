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

  static submitAssignment = async (payload: FormData) => {
    try {
      const res = await Api.post("/assignment/submit-assignment", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static createAdmin = async (payload: FormData) => {
    try {
      const res = await Api.post("/user/create-users", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static updateAdmin = async (payload: FormData) => {
    try {
      const res = await Api.post("/user/update-users", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static getCreatedCourse = async (payload: any) => {
    try {
      const res = await Api.post("/course/edit-course", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static getRequirement = async (payload: any) => {
    try {
      const res = await Api.post("/course/edit-requirements", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static getApplicationPayments = async () => {
    try {
      const res = await Api.get("/list-application-payments");
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static updataCreatedCourse = async (payload: any) => {
    try {
      const res = await Api.post("/course/update-course", payload);
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

  static updateCourseRequirements = async (payload: any) => {
    try {
      const res = await Api.post("/course/update-requirements", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static updateManualPayment = async (payload: any) => {
    try {
      const res = await Api.post("/update-manual-payment", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
  static submitPayment = async (payload: any) => {
    try {
      const res = await Api.post("/submit-payment", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static fetchApplication = async (payload: any) => {
    try {
      const res = await Api.post("/fetch-ongoing-application", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static fetchSingleApplication = async (payload: any) => {
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

  static createEvent = async (payload: any) => {
    try {
      const res = await Api.post("/event/create-event", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static createCourseAssignment = async (payload: any) => {
    try {
      const res = await Api.post("/assignment/create-assignment", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static createCourseExam = async (payload: any) => {
    try {
      const res = await Api.post("/exam/create-exams", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static createCourseCapstone = async (payload: any) => {
    try {
      const res = await Api.post("/capstone/create-capstone", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static quizMakingResources = async (payload: any) => {
    try {
      const res = await Api.post("/marking/fetch-quiz", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static assignmentMakingResources = async (payload: any) => {
    try {
      const res = await Api.post("/marking/fetch-assignment", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static fetchPaymentPlans = async (payload: any) => {
    try {
      const res = await Api.post("/payment/user-payment-plan", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static fetchMyProgrammes = async (payload: any) => {
    try {
      const res = await Api.post("/student/list-programmes", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static listCourseCapstone = async (payload: any) => {
    try {
      const res = await Api.post("/capstone/list-capstone", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static createCoursePoll = async (payload: any) => {
    try {
      const res = await Api.post("/poll/create-poll", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static createCourseQuiz = async (payload: any) => {
    try {
      const res = await Api.post("/quiz/create-quiz", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static createCourseQuizQuestion = async (payload: any) => {
    try {
      const res = await Api.post("/quiz/create-questions", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static createCourseQuizAnswers = async (payload: any) => {
    try {
      const res = await Api.post("/quiz/create-answers", payload);
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

  static updateCourseLesson = async (payload: FormData) => {
    try {
      const res = await Api.post("/course/update-lesson", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static createSupportTicket = async (payload: FormData) => {
    try {
      const res = await Api.post("/support/create-ticket", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static deleteCourseLesson = async (payload: any) => {
    try {
      const res = await Api.post("/lesson/delete-lesson", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static deleteCourseModule = async (payload: any) => {
    try {
      const res = await Api.post("/module/delete-module", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static updateCourseStatus = async (payload: any) => {
    try {
      const res = await Api.post("/course/update-course-status", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static updateCourseModule = async (payload: FormData) => {
    try {
      const res = await Api.post("/course/update-module", payload);
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

  static fetchAllApplication = async (): Promise<any> => {
    try {
      const res = await Api.get<any>("/list-all-applications");
      return res.data;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static fetchAllEvent = async (): Promise<any> => {
    try {
      const res = await Api.get<any>("/event/list-event");
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

  static getSingleTicket = async (payload: any) => {
    try {
      const res = await Api.post("/support/get-single-ticket", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static getEvent = async (payload: any) => {
    try {
      const res = await Api.post("/event/edit-event", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static getModulebyId = async (payload: any) => {
    try {
      const res = await Api.post("/module/list-modules-byid", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static startCourse = async (payload: any) => {
    try {
      const res = await Api.post("/lesson/start-course", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static getUserbyId = async (payload: any) => {
    try {
      const res = await Api.post("/user/edit-users", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
  static markingResources = async (payload: any) => {
    try {
      const res = await Api.post("/marking/fetch-recourses", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static getModuleByCourseId = async (payload: any) => {
    try {
      const res = await Api.post("/course/list-modules-bycourse", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
  static getLessonByModuleId = async (payload: any) => {
    try {
      const res = await Api.post("/course/list-lessons-bymodule", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static submitFluterres = async (payload: any) => {
    try {
      const res = await Api.post("/successful-payment-details", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static sendNotifications = async (payload: any) => {
    try {
      const res = await Api.post("/notification/send-notification", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static getSingleNotification = async (payload: any) => {
    try {
      const res = await Api.post(
        "/notification/get-single-notification",
        payload
      );
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

  static listTickets = async (): Promise<any> => {
    try {
      const res = await Api.get<any>("/support/list-tickets");
      return res.data;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static listNotifications = async (): Promise<any> => {
    try {
      const res = await Api.get<any>("/notification/list-notifications");
      return res.data;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static dashboardstats = async (): Promise<any> => {
    try {
      const res = await Api.get<any>("/course/dashboard-statistics");
      return res.data;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static systemUsers = async (): Promise<any> => {
    try {
      const res = await Api.get<any>("/user/system-users");
      return res.data;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static ticketReply = async (payload: any) => {
    try {
      const res = await Api.post("/support/response", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
  static getMyNotification = async (payload: any) => {
    try {
      const res = await Api.post(
        "/notification/fetch-user-notifications",
        payload
      );
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static listUsers = async (): Promise<any> => {
    try {
      const res = await Api.get<any>("/user/list-users");
      return res.data;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static listCoursebyId = async (id: string): Promise<any> => {
    try {
      const res = await Api.get<any>(`/course/get-course/${id}`);
      return res.data;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static modulebyCourseId = async (payload: any) => {
    try {
      const res = await Api.post("/course/list-modules-bycourse", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static lessonsByModuleId = async (payload: any) => {
    try {
      const res = await Api.post("/course/list-lessons-bymodule", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static acceptApplication = async (payload: any) => {
    try {
      const res = await Api.post("/accept-application", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static rejectApplication = async (payload: any) => {
    try {
      const res = await Api.post("/reject-application", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static deleteCourse = async (payload: any) => {
    try {
      const res = await Api.post("/course/delete-course", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static fetchQuestions = async (payload: { quiz_id: number | undefined }) => {
    try {
      const res = await Api.post("/quiz/list-questions", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static submitAnswer = async (payload: any) => {
    try {
      const res = await Api.post("/quiz/create-response", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
  static listQuiz = async (payload: any) => {
    try {
      const res = await Api.post("/quiz/list-quiz", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
  static listAssignment = async (payload: any) => {
    try {
      const res = await Api.post("/assignment/list-assignment", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static listModulebyId = async (payload: any) => {
    try {
      const res = await Api.post("/module/list-modules-byid", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };

  static listLessonbyId = async (payload: any) => {
    try {
      const res = await Api.post("/lesson/list-lesson-byid", payload);
      return res;
    } catch (error) {
      const handleError = error;
      throw handleError;
    }
  };
}
