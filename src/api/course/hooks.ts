import { useQuery } from "@tanstack/react-query";
import { CourseServices } from ".";

export const fetchPaymentPlans = () => {
  return useQuery({
    queryKey: ["paymentPlans"],
    queryFn: async () => {
      const res = await CourseServices.paymentPlans();
      return res;
    },
    initialData: undefined,
  });
};

export const fetchFormRequirements = () => {
  return useQuery({
    queryKey: ["form"],
    queryFn: async () => {
      const res = await CourseServices.formRequirements();
      return res;
    },
    initialData: undefined,
  });
};

export const fetchlistCourses = () => {
  return useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await CourseServices.listCourses();
      return res;
    },
    initialData: undefined,
  });
};

export const fetchlistNotification = () => {
  return useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const res = await CourseServices.listNotifications();
      return res;
    },
    initialData: undefined,
  });
};

export const fetchdashboardstats = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await CourseServices.dashboardstats();
      return res;
    },
    initialData: undefined,
  });
};

export const fetchSystemUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await CourseServices.systemUsers();
      return res;
    },
    initialData: undefined,
  });
};
export const fetchlistTickets = () => {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const res = await CourseServices.listTickets();
      return res;
    },
    initialData: undefined,
  });
};

export const fetchlistUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await CourseServices.listUsers();
      return res;
    },
    initialData: undefined,
  });
};

export const fetchlistCoursebyId = (id: string) => {
  return useQuery({
    queryKey: ["single_course"],
    queryFn: async () => {
      const res = await CourseServices.listCoursebyId(id);
      return res;
    },
    initialData: undefined,
  });
};

export const useFetchApplication = () => {
  return useQuery({
    queryKey: ["application"],
    queryFn: async () => {
      const res = await CourseServices.fetchAllApplication();
      return res;
    },
    initialData: undefined,
  });
};

export const useFetchEvent = () => {
  return useQuery({
    queryKey: ["event"],
    queryFn: async () => {
      const res = await CourseServices.fetchAllEvent();
      return res;
    },
    initialData: undefined,
  });
};
