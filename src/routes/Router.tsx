import App from "@/app/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./home/Home";
import CodeAnalyzer from "./codeanalyzer/CodeAnalyzer";
import ToneChanger from "./tonechanger/ToneChanger";
import StoryGenerator from "./storygenerator/StoryGenerator";
import CodingAssistant from "./codingassistant/CodingAssistant";

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
        {
          path: "codingassistant",
          element: <CodingAssistant />,
        },
        {
          path: "tonechanger",
          element: <ToneChanger />,
        },
        {
          path: "storygenerator",
          element: <StoryGenerator />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
