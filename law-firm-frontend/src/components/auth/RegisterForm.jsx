import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client", // client or lawyer
    specialization: "", // only for lawyers
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { register, error: authError } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.role === "lawyer" && !formData.specialization.trim()) {
      newErrors.specialization = "Specialization is required for lawyers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      if (formData.role === "lawyer") {
        userData.specialization = formData.specialization;
      }

      await register(userData);
      navigate("/login", {
        state: { success: "Registration successful! Please login." },
      });
    } catch (error) {
      setErrors({
        general: error.message || "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(errors.general || authError) && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{errors.general || authError}</p>
        </div>
      )}

      <Input
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Account Type
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="client"
              checked={formData.role === "client"}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Client</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="lawyer"
              checked={formData.role === "lawyer"}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Lawyer</span>
          </label>
        </div>
      </div>

      {formData.role === "lawyer" && (
        <Input
          label="Specialization"
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          error={errors.specialization}
          required
          placeholder="e.g., Criminal Law, Corporate Law"
        />
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
