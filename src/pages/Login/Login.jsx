import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import Button from "../../components/common/Button";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await authService.login(form);

      // ApiResponse wraps in .data, so res.data = { user, accessToken, refreshToken }
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
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Aether<span className="text-[#6c63ff]">Play</span>
          </h1>
          <p className="text-[#aaaaaa] text-sm mt-2">Sign in to your account</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#aaaaaa]">
                Username or Email
              </label>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username or email"
                required
                className="bg-[#272727] border border-[#2e2e2e] focus:border-[#6c63ff] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#717171] outline-none transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#aaaaaa]">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="bg-[#272727] border border-[#2e2e2e] focus:border-[#6c63ff] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#717171] outline-none transition-colors duration-200"
              />
            </div>

            <Button type="submit" loading={loading} className="w-full mt-2">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-[#aaaaaa] mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#6c63ff] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
