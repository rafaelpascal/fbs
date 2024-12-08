import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "../components/constants/routes";
import { Suspense } from "react";
import { LoadingSpinner } from "~/components/ui/loading-spinner.tsx";
import LectureLayout from "~/layouts/LectureLayout.tsx";
import { lazyLoad } from "~/utils/lazyLoad";
import Quiz from "~/pages/lecture/Quiz.tsx";
import WordLecture from "~/pages/lecture/wordLecture.tsx";
import Assignment from "~/pages/lecture/Assignment.tsx";
import BankTransfer from "~/pages/Courses/BankTransfer.tsx";
import Congratulations from "~/pages/lecture/Congratulations.tsx";
import LectureComplete from "~/pages/lecture/LectureComplete.tsx";
import Events from "~/pages/Home/Events.tsx";

// Lazy load the components
const Lecture = lazyLoad(() => import("~/pages/lecture/Lecture.tsx"));
const Login = lazyLoad(() => import("../pages/auth/Login.tsx"));
const Home = lazyLoad(() => import("~/pages/Courses/Courses.tsx"));
const AppLayout = lazyLoad(() => import("~/layouts/AppLayout.tsx"));
const Payment = lazyLoad(() => import("~/pages/Courses/Payment.tsx"));
const NewCourse = lazyLoad(() => import("~/pages/Courses/NewCourse.tsx"));
const Application = lazyLoad(() => import("~/pages/Courses/Application.tsx"));
const FormSubmitted = lazyLoad(
  () => import("~/pages/Courses/FormSubmitted.tsx")
);

// Define the router with the future flag inside createBrowserRouter
const router = createBrowserRouter([
  {
    path: ROUTES.NEW_COURSE,
    element: <NewCourse />,
  },
  {
    path: ROUTES.EVENTS,
    element: <Events />,
  },
  {
    path: ROUTES.APPLICATION,
    element: <Application />,
  },
  {
    path: ROUTES.FORM_SUBMITTED,
    element: <FormSubmitted />,
  },
  {
    path: ROUTES.HOME,
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Home />,
      },
      {
        path: ROUTES.PAYMENT,
        element: <Payment />,
      },
      {
        path: ROUTES.BANKTRANSFER,
        element: <BankTransfer />,
      },
    ],
  },
  {
    element: <LectureLayout />,
    children: [
      {
        path: ROUTES.LECTURE,
        element: <Lecture />,
      },
      {
        path: ROUTES.QUIZ,
        element: <Quiz />,
      },
      {
        path: ROUTES.WORD,
        element: <WordLecture />,
      },
      {
        path: ROUTES.ASSIGNMENT,
        element: <Assignment />,
      },
      {
        path: ROUTES.CONGRATULATIONS,
        element: <Congratulations />,
      },
      {
        path: ROUTES.LECTURECOMPLETE,
        element: <LectureComplete />,
      },
    ],
  },
]);

// App router component
const AppRouter = () => (
  <Suspense
    fallback={
      <div className="w-full h-[100vh] flex justify-center items-center">
        <LoadingSpinner />
      </div>
    }
  >
    <RouterProvider router={router} />
  </Suspense>
);

export default AppRouter;
