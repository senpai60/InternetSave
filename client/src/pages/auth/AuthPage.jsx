import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageLaout from "../../components/layout/PageLaout";
import { GitBranch, Mail } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register(formData);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Auth error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <PageLaout>
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2 italic">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-zinc-400 text-sm">
              {isLogin
                ? "Enter your credentials to access your second brain."
                : "Join Linkora and start organizing your internet today."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-500 ml-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-all"
                  required
                />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500 ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500 ml-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-zinc-50 text-zinc-950 font-bold py-4 rounded-2xl mt-4 hover:bg-zinc-200 transition-all cursor-pointer shadow-lg shadow-zinc-50/5"
            >
              {isLogin ? "Sign In" : "Get Started"}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <span className="relative bg-[#0d0d0d] px-4 text-xs text-zinc-500 uppercase tracking-widest">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 py-3 rounded-2xl hover:bg-zinc-800 transition-all cursor-pointer group">
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 py-3 rounded-2xl hover:bg-zinc-800 transition-all cursor-pointer group">
              <GitBranch className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>

          <p className="text-center mt-8 text-sm text-zinc-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-zinc-300 font-bold hover:text-zinc-100 underline decoration-zinc-700 underline-offset-4 cursor-pointer"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </PageLaout>
  );
};

export default AuthPage;
