import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "../components/constants/routes";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "~/components/ui/loading-spinner.tsx";

// Lazy load the components
const Login = lazy(() => import("../pages/auth/Login.tsx"));
const Home = lazy(() => import("~/pages/Courses/Courses.tsx"));
const AppLayout = lazy(() => import("~/layouts/AppLayout.tsx"));
const Payment = lazy(() => import("~/pages/Courses/Payment.tsx"));
const NewCourse = lazy(() => import("~/pages/Courses/NewCourse.tsx"));
const Application = lazy(() => import("~/pages/Courses/Application.tsx"));
const FormSubmitted = lazy(() => import("~/pages/Courses/FormSubmitted.tsx"));

// Define the router with the future flag inside createBrowserRouter
const router = createBrowserRouter([
  {
    path: ROUTES.NEW_COURSE,
    element: <NewCourse />,
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
