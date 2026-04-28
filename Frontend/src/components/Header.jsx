import React from "react";
import { NavLink } from "react-router";
import { useAuth } from "../store/useAuth.js";
import { useNavigate } from "react-router";

function Header() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!currentUser) return '/';
    if (currentUser.role === 'USER') return '/user-dashboard';
    if (currentUser.role === 'AUTHOR') return '/author-dashboard';
    if (currentUser.role === 'ADMIN') return '/admin-dashboard';
    return '/';
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-sky-400 px-2 py-1 rounded"
      : "text-white hover:text-sky-400 px-2";

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center gap-3">
        <img
          src="data:image/png;base64,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"
          alt="Logo"
          className="h-10 w-10 rounded-full"
        />
        <h1 className="text-2xl font-bold">Blog Platform</h1>
      </div>
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <NavLink to="/" className={linkClass}>Home</NavLink>
          </li>

          {!isAuthenticated ? (
            <>
              <li>
                <NavLink to="/register" className={linkClass}>Register</NavLink>
              </li>
              <li>
                <NavLink to="/login" className={linkClass}>Login</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={getDashboardPath()} className={linkClass}>Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/user-profile" className={linkClass}>Profile</NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-400 px-2 cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
