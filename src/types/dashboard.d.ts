interface AccountDetails {
  businessCount?: number;
  customersCount?: number;
  merchantCount?: number;
  beneficiaryCount?: number;
  businesses?: number;
  customers?: number;
  merchants?: number;
  beneficiaries?: number;
}

type PaymentPlan = {
  payment_planid: number;
  back_color: string;
  plan_category_id: number;
  plan_duration_id: number;
  is_onetime: number | null;
  amount: number;
  per_month: number;
  created_at: string;
  plan_categoryid: number;
  category: string;
  plan_durationid: number;
  duration: string;
  days: number;
};

type PaymentPlanResponse = {
  status: string;
  success: boolean;
  message: string;
  payment_plan: PaymentPlan[];
};
type FormRequirements = {
  id: number;
  requirements: string;
  requirement_text: string;
};

type FormRequirementsResponse = {
  status: string;
  success: boolean;
  message: string;
  requirements: FormRequirements[];
};

type Answer = {
  course_id: number;
  lesson_id: number;
  user_id: number;
  quiz_id: number;
  question_id: number;
  selected_answer_id: number;
};
