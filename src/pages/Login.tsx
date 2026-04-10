import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Lock, User as UserIcon, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  
  // Silent session clear on mount
  useState(() => {
    const logoutUrls = [
      "https://harticulture-ai-agent.vercel.app/api/auth/signout",
      "https://harticulture-ai-agent.vercel.app/logout"
    ];
    logoutUrls.forEach(url => {
      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      setTimeout(() => document.body.contains(iframe) && document.body.removeChild(iframe), 3000);
    });
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        toast.success("Login successful! Welcome back.");
        // Explicitly redirect based on role
        if (username === "state_officer") navigate("/state");
        else if (username === "tirupati_officer") navigate("/district");
        else navigate("/farmer");
      } else {
        toast.error("Invalid credentials. Please try again.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-inter p-6">
      {/* Dynamic Background Implementation */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110 hover:scale-100"
        style={{
          backgroundImage: "url('/login-bg.png')",
          filter: "brightness(0.6) contrast(1.1)"
        }}
      />

      {/* Overlay Mask */}
      <div className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/30 to-transparent" />

      <div className="relative z-20 w-full max-w-sm p-6 sm:p-8 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/40 animate-in fade-in zoom-in duration-700">
        {/* Logo & Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
            <img src="/Crop-logo.svg" alt="Horti-Smart Logo" className="h-16 w-16" />
          </div>
          <h1 className="text-2xl font-black text-foreground tracking-tight mb-0.5">
            Horti-Smart
          </h1>
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
            Andhra Pradesh Intelligence
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground ml-1 uppercase tracking-widest">Login ID</label>
            <div className="relative group">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Enter username"
                className="pl-11 h-12 bg-white/50 border-white/40 rounded-xl focus:ring-primary focus:border-primary text-sm font-semibold"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-muted-foreground ml-1 uppercase tracking-widest">Access Key</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="pl-11 pr-11 h-12 bg-white/50 border-white/40 rounded-xl focus:ring-primary focus:border-primary text-sm font-semibold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-black rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Wait...
              </div>
            ) : "Login to Portal"}
          </Button>
        </form>

        {/* Improved Toggleable Credentials Info */}
        <div className="mt-5 space-y-2">
          <button
            onClick={() => setShowCredentials(!showCredentials)}
            className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors bg-muted/20 rounded-xl border border-white/20"
          >
            <span>Demo Credentials</span>
            {showCredentials ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {showCredentials && (
            <div className="p-4 bg-muted/40 rounded-2xl border border-white/40 animate-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-1 gap-1.5 text-[10px] font-bold">
                <div className="flex justify-between items-center text-primary/80">
                  <span>STATE</span>
                  <span className="font-black">state_officer / 1234</span>
                </div>
                <div className="flex justify-between items-center text-blue-600/80">
                  <span>DISTRICT</span>
                  <span className="font-black">tirupati_officer / 1234</span>
                </div>
                <div className="flex justify-between items-center text-amber-600/80">
                  <span>FARMER</span>
                  <span className="font-black">farmer_tirupati / 1234</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-[9px] font-black text-muted-foreground/50 mt-5 uppercase tracking-[0.3em]">
          Govt of Andhra Pradesh
        </p>
      </div>
    </div>
  );
};

export default Login;
