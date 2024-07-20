import { createBrowserRouter } from "react-router-dom";
import Public from "./Public";
import NavBar from "../components/NavBar";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const routes = createBrowserRouter([
  {
    element: <Public />,
    children: [
      {
        path: "/",
        element: <NavBar />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <div className="h-screen bg-red-500"></div>,
  },
]);
export default routes;
