import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) {
      toast.error("Avatar image is required");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("avatar", avatar);
      if (coverImage) formData.append("coverImage", coverImage);

      await authService.register(formData);
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: "#1e1e1e",
    border: "1px solid #2e2e2e",
    borderRadius: "10px",
    padding: "0.7rem 1rem",
    fontSize: "0.875rem",
    color: "#ffffff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, background-color 0.2s",
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "#6c63ff";
    e.target.style.backgroundColor = "#1a1a2a";
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = "#2e2e2e";
    e.target.style.backgroundColor = "#1e1e1e";
  };

  const fields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "johndoe",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#0f0f0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              margin: "0 auto 0.75rem",
              backgroundColor: "rgba(108,99,255,0.12)",
              border: "1.5px solid rgba(108,99,255,0.35)",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <polygon points="5,3 19,12 5,21" fill="#6c63ff" />
              <rect
                x="15"
                y="9"
                width="6"
                height="6"
                rx="1.5"
                fill="#a29bff"
                opacity="0.7"
              />
            </svg>
          </div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Aether<span style={{ color: "#6c63ff" }}>Play</span>
          </h1>
          <p
            style={{
              color: "#888888",
              fontSize: "0.875rem",
              marginTop: "0.35rem",
            }}
          >
            Create your account
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: "#161616",
            border: "1px solid #2a2a2a",
            borderRadius: "20px",
            padding: "2rem",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* Text Fields */}
            {fields.map((field) => (
              <div
                key={field.name}
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label style={{ fontSize: "0.8125rem", color: "#888888" }}>
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            ))}

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                margin: "0.25rem 0",
              }}
            >
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "#2a2a2a" }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#555555",
                  whiteSpace: "nowrap",
                }}
              >
                profile images
              </span>
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "#2a2a2a" }}
              />
            </div>

            {/* Avatar Upload */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label style={{ fontSize: "0.8125rem", color: "#888888" }}>
                Avatar <span style={{ color: "#f87171" }}>*</span>
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "#1e1e1e",
                  border: avatar ? "1px solid #6c63ff" : "1px dashed #3a3a3a",
                  borderRadius: "10px",
                  padding: "0.65rem 1rem",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!avatar) e.currentTarget.style.borderColor = "#555";
                }}
                onMouseLeave={(e) => {
                  if (!avatar) e.currentTarget.style.borderColor = "#3a3a3a";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={avatar ? "#6c63ff" : "#666"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    color: avatar ? "#a29bff" : "#666666",
                    flex: 1,
                  }}
                >
                  {avatar ? `✓  ${avatar.name}` : "Choose avatar image"}
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "#444",
                    backgroundColor: "#2a2a2a",
                    padding: "2px 8px",
                    borderRadius: "6px",
                  }}
                >
                  Browse
                </span>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setAvatar(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            {/* Cover Image Upload */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label style={{ fontSize: "0.8125rem", color: "#888888" }}>
                Cover Image{" "}
                <span style={{ color: "#555555", fontSize: "0.75rem" }}>
                  (optional)
                </span>
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "#1e1e1e",
                  border: coverImage
                    ? "1px solid #6c63ff"
                    : "1px dashed #3a3a3a",
                  borderRadius: "10px",
                  padding: "0.65rem 1rem",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!coverImage) e.currentTarget.style.borderColor = "#555";
                }}
                onMouseLeave={(e) => {
                  if (!coverImage)
                    e.currentTarget.style.borderColor = "#3a3a3a";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={coverImage ? "#6c63ff" : "#666"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    color: coverImage ? "#a29bff" : "#666666",
                    flex: 1,
                  }}
                >
                  {coverImage ? `✓  ${coverImage.name}` : "Choose cover image"}
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "#444",
                    backgroundColor: "#2a2a2a",
                    padding: "2px 8px",
                    borderRadius: "6px",
                  }}
                >
                  Browse
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "0.25rem",
                padding: "0.75rem",
                backgroundColor: loading ? "#4a44cc" : "#6c63ff",
                border: "none",
                borderRadius: "10px",
                color: "#ffffff",
                fontSize: "0.9375rem",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.01em",
                transition: "background-color 0.2s, transform 0.1s",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = "#5a52e0";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = "#6c63ff";
              }}
              onMouseDown={(e) => {
                if (!loading) e.currentTarget.style.transform = "scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#666666",
              marginTop: "1.25rem",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#6c63ff", textDecoration: "none" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
