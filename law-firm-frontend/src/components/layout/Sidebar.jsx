import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  HomeIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  CalendarIcon,
  CreditCardIcon,
  LightBulbIcon,
  NewspaperIcon,
  DocumentDuplicateIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const { user, isClient, isLawyer, isAdmin } = useContext(AuthContext);
  const location = useLocation();

  // Define navigation items based on user role
  const navigationItems = [
    { name: "Dashboard", icon: HomeIcon, href: "/dashboard", visible: true },
    { name: "Cases", icon: BriefcaseIcon, href: "/cases", visible: true },
    {
      name: "Documents",
      icon: DocumentTextIcon,
      href: "/documents",
      visible: true,
    },
    {
      name: "Appointments",
      icon: CalendarIcon,
      href: "/appointments",
      visible: true,
    },
    {
      name: "Payments",
      icon: CreditCardIcon,
      href: "/payments",
      visible: true,
    },
    {
      name: "AI Analysis",
      icon: LightBulbIcon,
      href: "/analysis",
      visible: isLawyer || isAdmin,
    },
    {
      name: "Blogs",
      icon: NewspaperIcon,
      href: "/resources",
      visible: true,
    },
    {
      name: "Contracts",
      icon: DocumentDuplicateIcon,
      href: "/contracts",
      visible: true,
    },
    { name: "Profile", icon: UserCircleIcon, href: "/profile", visible: true },
  ];

  return (
    <div className="bg-blue-900 text-white h-full min-h-screen w-64 flex-shrink-0">
      <div className="p-4 flex items-center justify-center border-b border-blue-800">
        <Link to="/" className="text-xl font-bold">
          LegalEase
        </Link>
      </div>

      <div className="p-4 border-b border-blue-800">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
            <span className="text-lg font-semibold">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-medium">{user?.name || "User"}</p>
            <p className="text-sm text-blue-300">{user?.role || "Client"}</p>
          </div>
        </div>
      </div>

      <nav className="mt-4 px-2">
        <ul className="space-y-1">
          {navigationItems
            .filter((item) => item.visible)
            .map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-blue-800 text-white"
                        : "text-blue-300 hover:bg-blue-800 hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>

      <div className="mt-auto p-4 border-t border-blue-800">
        <div className="bg-blue-800 rounded-md p-4">
          <h4 className="font-medium">Need Help?</h4>
          <p className="text-sm text-blue-300 mt-1">
            Contact our support team for assistance with any issues.
          </p>
          <a
            href="mailto:support@legalease.com"
            className="block mt-3 text-sm text-white bg-blue-700 hover:bg-blue-600 py-2 px-3 rounded text-center"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
