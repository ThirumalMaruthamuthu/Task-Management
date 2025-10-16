import React from "react";

const Dropdown = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  data = [],
  error,
  touched,
}) => {
  const normalizedOptions = data.map((item) =>
    typeof item === "string" ? { name: item, value: item } : item
  );

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1 font-medium">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
          touched && error ? "border-red-500" : "border-gray-400"
        }`}
      >
        <option value="">Select {label || name}</option>
        {normalizedOptions.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>

      {touched && error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Dropdown;
