import App from "@/app/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./home/Home";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "codeanalyzer",
          element: <h1>Code Analyzer</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
