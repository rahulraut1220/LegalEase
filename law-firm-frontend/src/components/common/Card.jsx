import React from "react";
export const Card = ({
  children,
  title,
  className = "",
  padding = "p-6",
  shadow = "shadow-md",
  border = "border border-gray-200",
}) => {
  return (
    <div
      className={`bg-white rounded-lg ${shadow} ${border} ${padding} ${className}`}
    >
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  );
};
