import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProfile, updateUser } from "../redux/features/userSlice";
import toast from "react-hot-toast";

const EditProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user?.profile); // <-- FIXED HERE
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm({ name: profile.name, email: profile.email });
    }
  }, [profile]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser(form)).unwrap();
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Name"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
