import clsx from "clsx";

const variants = {
  primary: "bg-[#6c63ff] hover:bg-[#574fd6] text-white",
  secondary: "bg-[#272727] hover:bg-[#3f3f3f] text-white",
  ghost: "bg-transparent hover:bg-[#272727] text-[#aaaaaa] hover:text-white",
  danger: "bg-[#ef4444] hover:bg-red-700 text-white",
  outline:
    "border border-[#6c63ff] text-[#6c63ff] hover:bg-[#6c63ff] hover:text-white",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
