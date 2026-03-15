import clsx from "clsx";

const sizes = {
  sm: { width: "32px", height: "32px", fontSize: "12px" },
  md: { width: "36px", height: "36px", fontSize: "14px" },
  lg: { width: "48px", height: "48px", fontSize: "16px" },
  xl: { width: "80px", height: "80px", fontSize: "28px" },
};

const Avatar = ({ src, alt = "User", size = "md", className = "" }) => {
  const s = sizes[size];

  return (
    <div
      style={{
        width: s.width,
        height: s.height,
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#3d3d3d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      ) : (
        <span
          style={{
            color: "#fff",
            fontSize: s.fontSize,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {alt?.charAt(0)?.toUpperCase() || "?"}
        </span>
      )}
    </div>
  );
};

export default Avatar;
