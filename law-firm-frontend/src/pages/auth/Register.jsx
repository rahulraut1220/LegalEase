import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <RegisterForm />
          </div>

          <div className="text-center mt-4 text-sm text-gray-600">
            By registering, you agree to our{" "}
            <Link
              to="/terms"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
