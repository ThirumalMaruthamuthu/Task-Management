const Button = ({
  label,
  type = "button",
  variant = "primary",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  onClick,
}) => {
  const baseClasses =
    "py-2 px-4 rounded-lg font-semibold transition duration-200 focus:outline-none border";

  const variantClasses = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 border-transparent disabled:bg-blue-300",
    secondary:
      "bg-white text-gray-700 border-gray-400 hover:bg-gray-100 disabled:bg-gray-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700 border-transparent disabled:bg-red-300",
    edit: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 disabled:bg-gray-100",

    filter:
      "bg-green-600 text-white hover:bg-green-700 border-transparent disabled:bg-green-300",
  };

  const finalClass = `${baseClasses} ${variantClasses[variant]} ${
    fullWidth ? "w-full" : "min-w-[100px]"
  }`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={finalClass}
    >
      {isLoading ? "Processing..." : label}
    </button>
  );
};

export default Button;
