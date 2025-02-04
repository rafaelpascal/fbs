// src/pages/ErrorPage.tsx
// import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  //   const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
        <p className="text-xl text-gray-700 mt-4">Something went wrong.</p>
        {/* <p className="text-gray-500 mt-2">
          {error.statusText || error.message || "An unexpected error occurred."}
        </p> */}
        <a href="/login" className="mt-6 inline-block text-blue-600 underline">
          Back to Login
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
