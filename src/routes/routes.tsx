import { createBrowserRouter } from "react-router-dom";
import Public from "./Public";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

const routes = createBrowserRouter([
  {
    element: (
      <MainLayout>
        <Public />
      </MainLayout>
    ),
    children: [
      {
        path: "/",
        element: <div>Hi</div>,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "*",
    element: <div className="h-screen bg-red-500"></div>,
  },
]);
export default routes;
