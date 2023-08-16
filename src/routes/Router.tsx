import App from "@/app/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./home/Home";
import CodeAnalyzer from "./codeanalyzer/CodeAnalyzer";

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
          element: <CodeAnalyzer />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
