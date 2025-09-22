import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeUserPassword } from "../redux/features/userSlice";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(changeUserPassword(form)).unwrap();
      toast.success("Password changed");
    } catch {
      toast.error("Change failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
