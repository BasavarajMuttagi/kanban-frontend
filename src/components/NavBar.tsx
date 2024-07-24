import { Notepad, UserCircle } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import useKanbanStore from "../store";
import { createPortal } from "react-dom";
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";

const NavBar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { logout, token, displayName, email } = useKanbanStore();
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
        <UserCircle
          size={32}
          weight="fill"
          className="text-green-400 cursor-pointer"
          onClick={() => setShowProfile((prev) => !prev)}
        />
      )}
      {createPortal(
        <div
          className={twMerge(
            "fixed top-16 right-0 rounded-md bg-neutral-100 p-5 max-w-xs w-full border",
            showProfile
              ? "translate-x-30 duration-300"
              : "translate-x-full duration-300",
          )}
        >
          <ProfilePopover
            displayName={displayName}
            email={email}
            logout={logout}
            setShowProfile={setShowProfile}
          />
        </div>,
        document.body,
      )}
    </nav>
  );
};

export default NavBar;

const ProfilePopover = ({
  displayName,
  email,
  logout,
  setShowProfile,
}: {
  logout: () => void;
  displayName: string;
  email: string;
  setShowProfile: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col items-center space-y-5">
      <div className="flex flex-col items-center -space-y-1">
        <p className="text-sm font-semibold">{displayName}</p>
        <p className="text-[10px] text-neutral-300 font-medium">{email}</p>
      </div>
      <button
        onClick={() => {
          logout(), setShowProfile(false);
        }}
        className="px-3 py-1.5 rounded-md text-white bg-red-400 hover:brightness-90"
      >
        Logout
      </button>
    </div>
  );
};
