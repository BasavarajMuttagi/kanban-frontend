import { ReactNode } from "react";
import NavBar from "../components/NavBar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="min-h-dvh flex flex-col w-full"
      style={{ scrollbarWidth: "none" }}
    >
      <NavBar />
      {children}
    </div>
  );
};

export default MainLayout;
