import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { NotificationContext } from "../../context/NotificationContext";
import {
  BellIcon,
  Bars3Icon, // Correct icon for the mobile menu toggle
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { unreadCount } = useContext(NotificationContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-blue-800">
                LegalEase
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className={`${
                      location.pathname === "/dashboard"
                        ? "bg-blue-700 text-white"
                        : "text-blue-800 hover:bg-blue-100"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Dashboard
                  </Link>
                ) : (
                  publicLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-blue-800 hover:bg-blue-100 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {link.name}
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <>
                  <button
                    className="p-1 rounded-full text-gray-700 hover:text-blue-800 focus:outline-none relative"
                    onClick={() => navigate("/notifications")}
                  >
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>

                  <div className="ml-3 relative">
                    <div>
                      <button
                        className="max-w-xs flex items-center text-sm rounded-full focus:outline-none"
                        onClick={toggleProfileMenu}
                      >
                        <UserCircleIcon
                          className="h-8 w-8 text-gray-700"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    {profileMenuOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <div className="px-4 py-2 text-sm text-gray-700 border-b">
                            <p>Signed in as</p>
                            <p className="font-bold">
                              {user?.name || user?.email}
                            </p>
                          </div>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setProfileMenuOpen(false)}
                          >
                            Your Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-blue-800 hover:bg-blue-100 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-700 text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-800 hover:bg-blue-100 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-800 hover:bg-blue-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              publicLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-800 hover:bg-blue-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="px-2 space-y-1">
                <div className="flex items-center px-4 mb-2">
                  <div className="flex-shrink-0">
                    <UserCircleIcon
                      className="h-10 w-10 text-gray-700"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user?.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user?.email}
                    </div>
                  </div>
                  <button
                    className="ml-auto p-1 rounded-full text-gray-700 hover:text-blue-800 focus:outline-none relative"
                    onClick={() => {
                      navigate("/notifications");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-800 hover:bg-blue-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-blue-800 hover:bg-blue-100"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-800 hover:bg-blue-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-700 text-white hover:bg-blue-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
