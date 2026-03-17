import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <p style={{ fontSize: "80px", marginBottom: "16px" }}>📺</p>
      <h1
        style={{
          color: "#f1f1f1",
          fontSize: "48px",
          fontWeight: 700,
          marginBottom: "8px",
        }}
      >
        404
      </h1>
      <p style={{ color: "#aaaaaa", fontSize: "18px", marginBottom: "4px" }}>
        This page isn't available
      </p>
      <p style={{ color: "#717171", fontSize: "14px", marginBottom: "32px" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          padding: "12px 32px",
          backgroundColor: "#f1f1f1",
          color: "#0f0f0f",
          borderRadius: "24px",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: "15px",
          transition: "all 0.2s",
        }}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
