import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { label: "Cases", path: "/cases/my" },
    { label: "Contracts", path: "/contracts/client" },
    { label: "Appointments", path: "/appointments/my-appointments" },
    { label: "PDF QA", path: "/pdf" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-full p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-200 ${
                isActive ? "bg-gray-300 font-semibold" : ""
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
