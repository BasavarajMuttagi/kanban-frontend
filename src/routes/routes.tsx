import { createBrowserRouter } from "react-router-dom";
import Public from "./Public";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import Private from "./Private";
import ListAllBoards from "../components/ListAllBoards";
import KanbanBoard from "../components/KanbanBoard";

const routes = createBrowserRouter([
  {
    element: (
      <MainLayout>
        <Public />
      </MainLayout>
    ),
    children: [
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
    element: (
      <MainLayout>
        <Private />
      </MainLayout>
    ),
    children: [
      {
        path: "/",
        element: <ListAllBoards />,
      },
      {
        path: "/board/:boardId",
        element: <KanbanBoard />,
      },
    ],
  },
  {
    path: "*",
    element: <div className="h-screen bg-red-500"></div>,
  },
]);
export default routes;
