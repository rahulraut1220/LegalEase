import React from "react";

const Input = ({
  type = "text",
  label,
  name,
  value,
  onChange,
  placeholder = "",
  error,
  required = false,
  disabled = false,
  className = "",
  icon,
  helpText,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}

        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full rounded-md shadow-sm py-2 px-4 border ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${icon ? "pl-10" : ""}`}
        />
      </div>

      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
