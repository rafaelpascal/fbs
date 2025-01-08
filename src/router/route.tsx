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
import WordLecture from "~/pages/lecture/wordLecture.tsx";
import Assignment from "~/pages/lecture/Assignment.tsx";
import BankTransfer from "~/pages/Courses/BankTransfer.tsx";
import Congratulations from "~/pages/lecture/Congratulations.tsx";
import LectureComplete from "~/pages/lecture/LectureComplete.tsx";
import Events from "~/pages/Home/Events.tsx";
import SingleEvent from "~/pages/Home/SingleEvent.tsx";
import AdminAppLayout from "~/layouts/AdminLayout.tsx";
import Dashboard from "~/pages/Admin/Dashboard.tsx";
import FacultiesTable from "~/pages/Admin/Tables/FacultiesTable.tsx";
import ApplicationTable from "~/pages/Admin/Tables/ApplicationTable.tsx";
import PaymentsTable from "~/pages/Admin/Tables/PaymentsTable.tsx";
import CourseApplications from "~/pages/Admin/Students/CourseApplications.tsx";
import AdminCourses from "~/pages/Admin/Courses/AdminCourses.tsx";
import CourseAssignmentTable from "~/pages/Admin/Courses/CourseTable/CourseAssignmentTable.tsx";
import CapstonesTable from "~/pages/Admin/Courses/CourseTable/CapstonesTable.tsx";
import PollsTable from "~/pages/Admin/Courses/CourseTable/PollsTable.tsx";
import QuizzesTable from "~/pages/Admin/Courses/CourseTable/QuizzesTable.tsx";
import CreateCourse from "~/pages/Admin/Courses/CreateCourse.tsx";
import { TanstackProvider } from "~/context/tanstack-query/index.tsx";
import AdminManagement from "~/pages/Admin/AccountManagement/AdminManagement.tsx";
import Transactions from "~/pages/Courses/Transactions.tsx";

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
        path: ROUTES.COURSEAPPLICATION,
        element: <CourseApplications />,
      },
      {
        path: ROUTES.COURSES,
        element: <AdminCourses />,
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
        path: ROUTES.NEWCOURSE,
        element: <CreateCourse />,
      },
      {
        path: ROUTES.ADMINMANAGEMENT,
        element: <AdminManagement />,
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
  <TanstackProvider>
    <Suspense
      fallback={
        <div className="w-full h-[100vh] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </TanstackProvider>
);

export default AppRouter;
