import React from "react";
import { LOGO_URL } from "../utils/urlConstants";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isOnline, lastChangedAt } = useOnlineStatus();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const statusTime = new Date(lastChangedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const navItemClass =
    "px-2 py-1 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-orange-500";
  const navActiveClass = "text-orange-600";
  const userName = user?.email ? user.email.split("@")[0] : "";

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
      return;
    }
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={LOGO_URL}
            alt="Restaurant logo"
          />
          <span className="text-lg font-extrabold tracking-tight text-orange-500">Swiggy Style</span>
        </Link>

        <nav>
          <ul className="flex items-center gap-4">
            <li
              className="hidden items-center gap-2 text-xs text-slate-600 sm:flex"
              title={`Last updated at ${statusTime}`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`}
              />
              <span>{isOnline ? "Online" : "Offline"}</span>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${navItemClass} ${isActive ? navActiveClass : ""}`
                }
                to="/"
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${navItemClass} ${isActive ? navActiveClass : ""}`
                }
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${navItemClass} ${isActive ? navActiveClass : ""}`
                }
                to="/contact"
              >
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${navItemClass} ${isActive ? navActiveClass : ""}`
                }
                to="/grocery"
              >
                Grocery
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${navItemClass} ${isActive ? navActiveClass : ""}`
                }
                to="/cart"
              >
                Cart
              </NavLink>
            </li>
            {isAuthenticated && (
              <li className="hidden rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 md:block">
                Welcome, {userName}
              </li>
            )}
            <li>
              <button
                className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-600"
                onClick={handleAuthClick}
              >
                {isAuthenticated ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
