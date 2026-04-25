import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import Button from "../../components/common/Button";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await authService.login(form);
      const { accessToken, user } = res.data;
      localStorage.setItem("accessToken", accessToken);
      dispatch(setUser(user));
      toast.success(`Welcome back, ${user?.username}!`);
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

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
            Sign in to your account
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
          {/* OAuth Buttons */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginBottom: "1.25rem",
            }}
          >
            <button
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                backgroundColor: "#1e1e1e",
                border: "1px solid #2e2e2e",
                borderRadius: "10px",
                padding: "0.6rem 0",
                color: "#cccccc",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#252525")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1e1e1e")
              }
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                backgroundColor: "#1e1e1e",
                border: "1px solid #2e2e2e",
                borderRadius: "10px",
                padding: "0.6rem 0",
                color: "#cccccc",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#252525")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1e1e1e")
              }
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#cccccc">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
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
              or continue with email
            </span>
            <div
              style={{ flex: 1, height: "1px", backgroundColor: "#2a2a2a" }}
            />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* Username */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label style={{ fontSize: "0.8125rem", color: "#888888" }}>
                Username or Email
              </label>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username or email"
                required
                style={{
                  width: "100%",
                  backgroundColor: "#1e1e1e",
                  border: "1px solid #2e2e2e",
                  borderRadius: "10px",
                  padding: "0.7rem 1rem",
                  fontSize: "0.875rem",
                  color: "#ffffff",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#6c63ff";
                  e.target.style.backgroundColor = "#1a1a2a";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#2e2e2e";
                  e.target.style.backgroundColor = "#1e1e1e";
                }}
              />
            </div>

            {/* Password */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <label style={{ fontSize: "0.8125rem", color: "#888888" }}>
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  style={{
                    fontSize: "0.75rem",
                    color: "#6c63ff",
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </Link>
              </div>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  backgroundColor: "#1e1e1e",
                  border: "1px solid #2e2e2e",
                  borderRadius: "10px",
                  padding: "0.7rem 1rem",
                  fontSize: "0.875rem",
                  color: "#ffffff",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#6c63ff";
                  e.target.style.backgroundColor = "#1a1a2a";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#2e2e2e";
                  e.target.style.backgroundColor = "#1e1e1e";
                }}
              />
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
                transition: "background-color 0.2s, transform 0.1s",
                letterSpacing: "0.01em",
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
              {loading ? "Signing in..." : "Sign In"}
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
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#6c63ff", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
