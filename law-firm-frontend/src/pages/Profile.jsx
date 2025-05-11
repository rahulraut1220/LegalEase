import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";
import DashboardLayout from "../components/layout/DashboardLayout";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateUserProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Edit Profile
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center my-12">
              <Spinner />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>
                <div className="flex-1">
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={true}
                required
              />

              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          )}

          <div className="mt-12 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Security Settings
            </h2>
            <Button
              onClick={() => {
                /* Implement password change functionality */
              }}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
