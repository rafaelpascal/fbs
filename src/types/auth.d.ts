type FormRequirement = {
  id: number;
  course_id: number;
  requirements: string;
  requirement_text: string;
};
interface OTPsentResponse {
  status: string;
  success: string;
  message: string;
  email: string;
  userid: number;
  programmeid: number;
  form_requirements: FormRequirement[];
}

interface VALIDATEOTPResponse {
  firstname: string;
  lastname: string;
  email: string;
  userid: number;
}

interface APPLICATION {
  application_id: number;
  userid: string;
  firstname: string;
  lastname: string;
  email: string;
  olevel_certificate: string;
  degree_certificate: string;
  cv: string;
  resume: string;
}
interface UserProfile {
  userid: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  user_role: number;
  user_code: string;
}

interface LoginResponse {
  status: string;
  success: boolean;
  message: string;
  profile: UserProfile[];
  program_data: any[];
  token: string;
}
