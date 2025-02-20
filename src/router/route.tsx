import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ROUTES } from "../components/constants/routes";
import { Suspense } from "react";
import { LoadingSpinner } from "~/components/ui/loading-spinner.tsx";
import LectureLayout from "~/layouts/LectureLayout.tsx";
import { lazyLoad } from "~/utils/lazyLoad";
import Quiz from "~/pages/lecture/Quiz.tsx";
const WordLecture = lazyLoad(() => import("~/pages/lecture/wordLecture.tsx"));
const Assignment = lazyLoad(() => import("~/pages/lecture/Assignment.tsx"));
const BankTransfer = lazyLoad(() => import("~/pages/Courses/BankTransfer.tsx"));
const Congratulations = lazyLoad(
  () => import("~/pages/lecture/Congratulations.tsx")
);
const LectureComplete = lazyLoad(
  () => import("~/pages/lecture/LectureComplete.tsx")
);
const Events = lazyLoad(() => import("~/pages/Home/Events.tsx"));
const SingleEvent = lazyLoad(() => import("~/pages/Home/SingleEvent.tsx"));
const AdminAppLayout = lazyLoad(() => import("~/layouts/AdminLayout.tsx"));
const Dashboard = lazyLoad(() => import("~/pages/Admin/Dashboard.tsx"));
const FacultiesTable = lazyLoad(
  () => import("~/pages/Admin/Tables/FacultiesTable.tsx")
);
const ApplicationTable = lazyLoad(
  () => import("~/pages/Admin/Tables/ApplicationTable.tsx")
);
const PaymentsTable = lazyLoad(
  () => import("~/pages/Admin/Tables/PaymentsTable.tsx")
);
const CourseApplications = lazyLoad(
  () => import("~/pages/Admin/Students/CourseApplications.tsx")
);
const AdminCourses = lazyLoad(
  () => import("~/pages/Admin/Courses/AdminCourses.tsx")
);
const CourseAssignmentTable = lazyLoad(
  () => import("~/pages/Admin/Courses/CourseTable/CourseAssignmentTable.tsx")
);
const CapstonesTable = lazyLoad(
  () => import("~/pages/Admin/Courses/CourseTable/CapstonesTable.tsx")
);
const PollsTable = lazyLoad(
  () => import("~/pages/Admin/Courses/CourseTable/PollsTable.tsx")
);
const QuizzesTable = lazyLoad(
  () => import("~/pages/Admin/Courses/CourseTable/QuizzesTable.tsx")
);
const CreateCourse = lazyLoad(
  () => import("~/pages/Admin/Courses/CreateCourse.tsx")
);
const AdminManagement = lazyLoad(
  () => import("~/pages/Admin/AccountManagement/AdminManagement.tsx")
);
const Transactions = lazyLoad(() => import("~/pages/Courses/Transactions.tsx"));

import { TanstackProvider } from "~/context/tanstack-query/index.tsx";
import EventsManagement from "~/pages/Admin/Events/EventsManagement.tsx";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "~/pages/ErrorPage.tsx";
import ForgotPassword from "~/pages/auth/ForgotPassword.tsx";
import ChangePasswordpage from "~/pages/auth/ChangePasswordpage.tsx";
import StudentsManagement from "~/pages/Admin/Students/StudentsManagement.tsx";

// Define the router with the future flag inside createBrowserRouter
const router = createBrowserRouter(
  [
    {
      path: "/", // Root route
      errorElement: <ErrorPage />, // Global error handler
      children: [
        {
          path: ROUTES.NEW_COURSE,
          element: <NewCourse />,
        },
        {
          path: ROUTES.EVENTS,
          element: <Events />,
        },
        {
          path: ROUTES.SINGLE_EVENT,
          element: <SingleEvent />,
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
          path: ROUTES.FORGOTPASSWORD,
          element: <ForgotPassword />,
        },
        {
          path: ROUTES.CHANGEPASSWORD,
          element: <ChangePasswordpage />,
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
            {
              path: ROUTES.STUDENTRANSACTION,
              element: <Transactions />,
            },
          ],
        },
        {
          element: <AdminAppLayout />,
          children: [
            {
              path: ROUTES.ADMINDASHBOARD,
              element: <Dashboard />,
              children: [
                {
                  index: true,
                  element: <Navigate to={ROUTES.PAYMENTTABLE} />,
                },
                {
                  path: ROUTES.PAYMENTTABLE,
                  element: <PaymentsTable />,
                },
                {
                  path: ROUTES.APPLICATIONTABLE,
                  element: <ApplicationTable />,
                },
                {
                  path: ROUTES.FACULTYTABLE,
                  element: <FacultiesTable />,
                },
              ],
            },
            {
              path: ROUTES.STUDENTSMANAGEMENT,
              element: <StudentsManagement />,
              children: [
                {
                  index: true,
                  element: <Navigate to={ROUTES.ASSIGNMENTSTABLE} />,
                },
                {
                  path: ROUTES.ASSIGNMENTSTABLE,
                  element: <CourseAssignmentTable />,
                },
                {
                  path: ROUTES.CAPSTONESTABLE,
                  element: <CapstonesTable />,
                },
                {
                  path: ROUTES.POLLSTABLE,
                  element: <PollsTable />,
                },
                {
                  path: ROUTES.QUIZZESTABLE,
                  element: <QuizzesTable />,
                },
              ],
            },
            {
              path: ROUTES.COURSEAPPLICATION,
              element: <CourseApplications />,
            },
            {
              path: ROUTES.COURSES,
              element: <AdminCourses />,
            },
            {
              path: ROUTES.NEWCOURSE,
              element: <CreateCourse />,
            },
            {
              path: ROUTES.ADMINMANAGEMENT,
              element: <AdminManagement />,
            },
            {
              path: ROUTES.EVENTMANAGEMENT,
              element: <EventsManagement />,
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
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

// App router component
const AppRouter = () => (
  <TanstackProvider>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Suspense
      fallback={
        <div className="w-full h-[100vh] flex justify-center items-center">
          <LoadingSpinner size="sm" />
        </div>
      }
    >
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </Suspense>
  </TanstackProvider>
);

export default AppRouter;
