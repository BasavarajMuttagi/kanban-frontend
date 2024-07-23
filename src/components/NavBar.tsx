import { Notepad } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import useKanbanStore from "../store";

const NavBar = () => {
  const { logout, token } = useKanbanStore();
  return (
    <nav className="bg-blue-500 h-16 flex items-center justify-between px-5 font-medium text-white tracking-wider">
      <NavLink to={"/"} className="flex items-center space-x-1.5">
        <h1 className="text-2xl">Kanban</h1>
        <Notepad size={32} weight="fill" />
      </NavLink>
      {!token && (
        <ul className="hidden sm:flex items-center space-x-10">
          <li className="group">
            <NavLink to={"/login"}>
              <button className="px-3 py-1.5 rounded-md hover:bg-white hover:text-blue-500  group-has-[>a.active]:bg-white group-has-[>a.active]:text-blue-500">
                Login
              </button>
            </NavLink>
          </li>
          <li className="group">
            <NavLink to={"/signup"}>
              <button className="px-3 py-1.5 rounded-md hover:bg-white hover:text-blue-500  group-has-[>a.active]:bg-white group-has-[>a.active]:text-blue-500">
                Signup
              </button>
            </NavLink>
          </li>
        </ul>
      )}
      {token && (
        <button
          onClick={() => logout()}
          className="px-3 py-1.5 rounded-md text-white bg-red-400 hover:brightness-90"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default NavBar;
