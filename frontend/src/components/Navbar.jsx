import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation } from "react-router";
import {
  BellIcon,
  LogOutIcon,
  Menu,
  MessageSquareText,
  MoveLeft,
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();
    const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-10 h-16 flex items-center">
        <div className="w-full mx-auto px-4 flex items-center justify-between">
          {!isChatPage && (
            <button
              className="lg:hidden btn btn-ghost btn-circle"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          <div className="flex items-center justify-end w-full gap-1">
            {/* LOGO - ONLY SHOW ON CHAT PAGE */}
            {isChatPage && (
              <div className="pl-5 hidden sm:block">
                <Link to="/" className="flex items-center gap-2">
                  <MessageSquareText className="size-9 text-primary" />
                  <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider mb-1">
                    Crypchat
                  </span>
                </Link>
              </div>
            )}
            <div className="flex items-center gap-3 sm:gap-4 ml-auto">
              <div className="tooltip tooltip-bottom" data-tip="Notifications">
                <Link to={"/notifications"}>
                  <button className="btn btn-ghost btn-circle">
                    <BellIcon className="w-6 h-6 text-base-content opacity-75" />
                  </button>
                </Link>
              </div>
            </div>

            <ThemeSelector />

            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  src={authUser?.profilePic || "/default-avatar.png"}
                  alt={authUser?.fullName || "User Avatar"}
                />
              </div>
            </div>

            {/* Logout Button */}
            <div className="tooltip tooltip-bottom" data-tip="Logout">
              <button
                className="btn btn-ghost btn-circle ml-3"
                onClick={logoutMutation}
              >
                <LogOutIcon className="w-6 h-6 text-base-content opacity-75" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {!isChatPage && (
        <>
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity ${
              sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            } sm:hidden`}
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div
            className={`fixed top-0 left-0 h-full w-64 bg-base-100 shadow-lg z-40 transform transition-transform sm:hidden ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar isMobile={true} />
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
