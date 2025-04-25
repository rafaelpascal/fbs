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
// const FacultiesTable = lazyLoad(
//   () => import("~/pages/Admin/Tables/FacultiesTable.tsx")
// );
const ApplicationTable = lazyLoad(
  () => import("~/pages/Admin/Tables/ApplicationTable.tsx")
);
// const PaymentsTable = lazyLoad(
//   () => import("~/pages/Admin/Tables/PaymentsTable.tsx")
// );
const CourseApplications = lazyLoad(
  () => import("~/pages/Admin/Students/CourseApplications.tsx")
);
const AdminCourses = lazyLoad(
  () => import("~/pages/Admin/Courses/AdminCourses.tsx")
);
const EditCourses = lazyLoad(
  () => import("~/pages/EditCourses/EditCourses.tsx")
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
const Pay = lazyLoad(() => import("~/pages/Courses/Payments.tsx"));
const FormSubmitted = lazyLoad(
  () => import("~/pages/Courses/FormSubmitted.tsx")
);
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "~/pages/ErrorPage.tsx";
import ForgotPassword from "~/pages/auth/ForgotPassword.tsx";
import ChangePasswordpage from "~/pages/auth/ChangePasswordpage.tsx";
import StudentsManagement from "~/pages/Admin/Students/StudentsManagement.tsx";
import Exam from "~/pages/lecture/Exam.tsx";
import NewAssignment from "~/pages/lecture/NewAssignment.tsx";
import Polls from "~/pages/lecture/Poll.tsx";
import AdminEvents from "~/pages/Admin/Events/AdminEvents.tsx";
import AdmissionPage from "~/pages/Admin/Admission/Admission.tsx";
import Support from "~/pages/Admin/Support/Support.tsx";
import PendingTicket from "~/pages/Admin/Support/PendingTicket.tsx";
import InactiveUsers from "~/pages/Admin/Support/InactiveUsers.tsx";
import UnpaidBalances from "~/pages/Admin/Support/UnpaidBalances.tsx";
import ConversationsScreen from "~/pages/Admin/Support/Conversations.tsx";
import EmailList from "~/pages/Admin/Support/EmailList.tsx";
import SingleResources from "~/pages/Admin/Support/SingleResources.tsx";
import Profile from "~/pages/Students/Profile.tsx";
import Forum from "~/pages/Courses/Forum.tsx";
import SingleConversation from "~/pages/Courses/SingleConversation.tsx";
import Conversations from "~/pages/Courses/Conversations.tsx";
import Notification from "~/pages/Courses/Notification.tsx";
import Notifications from "~/pages/Admin/NotificationsManagement/Notifications.tsx";
import Capstone from "~/pages/lecture/Capstone.tsx";
import PaymentPlan from "~/pages/Courses/PaymentPlan.tsx";

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
              path: ROUTES.SINGLERESOURCE,
              element: <SingleResources />,
            },
            {
              path: ROUTES.PAYMENT,
              element: <Payment />,
            },
            {
              path: ROUTES.PAYMENTPLAN,
              element: <PaymentPlan />,
            },
            {
              path: ROUTES.BANKTRANSFER,
              element: <BankTransfer />,
            },
            {
              path: ROUTES.FORUM,
              element: <Forum />,
            },
            {
              path: ROUTES.NOTIFICATION,
              element: <Notification />,
            },
            {
              path: ROUTES.FORUMCONVERSATION,
              element: <SingleConversation />,
            },
            {
              path: ROUTES.CONVERSATION,
              element: <Conversations />,
            },
            {
              path: ROUTES.STUDENTRANSACTION,
              element: <Transactions />,
            },
            {
              path: ROUTES.STUDENTPROFILE,
              element: <Profile />,
            },
          ],
        },
        {
          element: <AdminAppLayout />,
          children: [
            {
              path: ROUTES.ADMINDASHBOARD,
              element: <Dashboard />,
              // children: [
              //   // {
              //   //   index: true,
              //   //   element: <Navigate to={ROUTES.APPLICATIONTABLE} />,
              //   // },
              //   {
              //     path: ROUTES.PAYMENTTABLE,
              //     element: <PaymentsTable />,
              //   },
              //   {
              //     path: ROUTES.APPLICATIONTABLE,
              //     element: <ApplicationTable />,
              //   },
              //   {
              //     path: ROUTES.FACULTYTABLE,
              //     element: <FacultiesTable />,
              //   },
              // ],
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
              path: ROUTES.NOTIFICATIONS,
              element: <Notifications />,
            },
            {
              path: ROUTES.COURSEAPPLICATION,
              element: <CourseApplications />,
            },
            {
              path: ROUTES.SUPPORT,
              element: <Support />,
              children: [
                {
                  index: true,
                  element: <Navigate to={ROUTES.PENDINGTICKET} />,
                },
                {
                  path: ROUTES.PENDINGTICKET,
                  element: <PendingTicket />,
                },
                {
                  path: ROUTES.UNPAIDBALANCES,
                  element: <UnpaidBalances />,
                },
                {
                  path: ROUTES.INACTIVEUSERS,
                  element: <InactiveUsers />,
                },
                {
                  path: ROUTES.CONVERSATIONS,
                  element: <ConversationsScreen />,
                },
                {
                  path: ROUTES.EMAIL_LIST,
                  element: <EmailList />,
                },
              ],
            },
            {
              path: ROUTES.ADMISSIONPAGE,
              element: <AdmissionPage />,
              children: [
                {
                  index: true,
                  element: <Navigate to={ROUTES.APPLICATIONTABLE} />,
                },
                // {
                //   path: ROUTES.PAYMENTTABLE,
                //   element: <PaymentsTable />,
                // },
                {
                  path: ROUTES.APPLICATIONTABLE,
                  element: <ApplicationTable />,
                },
                // {
                //   path: ROUTES.FACULTYTABLE,
                //   element: <FacultiesTable />,
                // },
              ],
            },
            {
              path: ROUTES.EDITCOURSES,
              element: <EditCourses />,
            },
            {
              path: ROUTES.COURSES,
              element: <AdminCourses />,
            },
            {
              path: ROUTES.PAYMENTS,
              element: <Pay />,
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
            {
              path: ROUTES.EVENTEDIT,
              element: <EventsManagement />,
            },
            {
              path: ROUTES.ADMINEVENT,
              element: <AdminEvents />,
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
              path: ROUTES.EXAM,
              element: <Exam />,
            },
            {
              path: ROUTES.NEWASSIGNMENT,
              element: <NewAssignment />,
            },
            {
              path: ROUTES.CAPSTONE,
              element: <Capstone />,
            },
            {
              path: ROUTES.POLLS,
              element: <Polls />,
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
