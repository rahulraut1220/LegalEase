import { useDispatch } from "react-redux";
import { registerUser } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "client", // default
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(form)).unwrap();
      toast.success("Registered successfully!");
      navigate("/profile");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input w-full mb-3 p-2 border rounded"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          className="input w-full mb-3 p-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="input w-full mb-3 p-2 border rounded"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        >
          <option value="client">Client</option>
          <option value="lawyer">Lawyer</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
