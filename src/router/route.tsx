import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "../components/constants/routes";
// import Login from "../pages/auth/Login.tsx";
// import Home from "~/pages/Courses/Courses.tsx";
// import { AppLayout } from "~/layouts/AppLayout.tsx";
// import Payment from "~/pages/Courses/Payment.tsx";
import NewCourse from "~/pages/Courses/NewCourse.tsx";

// Define the router with the future flag inside createBrowserRouter
const router = createBrowserRouter([
  {
    path: ROUTES.NEW_COURSE,
    element: <NewCourse />,
  },
  // {
  //   path: ROUTES.HOME,
  //   element: <Login />,
  // },
  // {
  //   path: ROUTES.HOME,
  //   element: <AppLayout />,
  //   children: [
  //     {
  //       path: ROUTES.DASHBOARD,
  //       element: <Home />,
  //     },
  //     {
  //       path: ROUTES.PAYMENT,
  //       element: <Payment />,
  //     },
  //   ],
  // },
]);

// App router component
const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
