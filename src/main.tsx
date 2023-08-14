import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./layout/main/home/Home.tsx";
import { cn } from "./common/lib/utils.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Home
            className={cn(
              "mt-12 px-4 flex flex-col items-center gap-20",
              "min-[320px]:p-4 lg:p-8",
              "2xl:p-12 2xl:gap-48",
            )}
          />
        ),
      },
      {
        path: "codeanalyzer",
        element: <h1>Code Analyzer</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
