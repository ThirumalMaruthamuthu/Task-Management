import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none  ${
          touched && error ? "border-red-500" : "border-gray-400"
        }`}
      />

      {touched && error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
