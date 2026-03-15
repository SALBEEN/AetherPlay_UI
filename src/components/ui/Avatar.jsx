import clsx from "clsx";

const sizes = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-20 h-20 text-2xl",
};

const Avatar = ({ src, alt = "User", size = "md", className = "" }) => {
  return (
    <div
      className={clsx(
        "rounded-full overflow-hidden shrink-0 bg-[#272727]",
        sizes[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#aaaaaa] font-semibold uppercase">
          {alt?.charAt(0)}
        </div>
      )}
    </div>
  );
};

export default Avatar;
