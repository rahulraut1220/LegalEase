// src/components/Navbar.js
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-between">
    <div className="font-bold">LegalEase</div>
    <div className="space-x-4">
      <Link to="/profile">Profile</Link>
      <Link to="/cases/my">Cases</Link>
      <Link to="/contracts/client">Contracts</Link>
      <Link to="/appointments/my-appointments">Appointments</Link>
    </div>
  </nav>
);

export default Navbar;
