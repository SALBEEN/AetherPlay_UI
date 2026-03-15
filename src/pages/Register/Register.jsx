import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import Button from "../../components/common/Button";
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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (avatar) formData.append("avatar", avatar);

      await authService.register(formData);
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Aether<span className="text-[#6c63ff]">Play</span>
          </h1>
          <p className="text-[#aaaaaa] text-sm mt-2">Create your account</p>
        </div>

        {/* Card */}
        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {[
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
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-1.5">
                <label className="text-sm text-[#aaaaaa]">{field.label}</label>
                <input
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  className="bg-[#272727] border border-[#2e2e2e] focus:border-[#6c63ff] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#717171] outline-none transition-colors duration-200"
                />
              </div>
            ))}

            {/* Avatar Upload */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#aaaaaa]">
                Avatar (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files[0])}
                className="text-sm text-[#aaaaaa] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#272727] file:text-white hover:file:bg-[#3f3f3f] file:cursor-pointer"
              />
            </div>

            <Button type="submit" loading={loading} className="w-full mt-2">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-[#aaaaaa] mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#6c63ff] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
