import clsx from "clsx";

const variants = {
  default: "bg-[#272727] text-[#aaaaaa]",
  brand: "bg-[#6c63ff] text-white",
  success: "bg-green-500/20 text-green-400",
  danger: "bg-red-500/20 text-red-400",
};

const Badge = ({ children, variant = "default", className = "" }) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
