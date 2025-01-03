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
