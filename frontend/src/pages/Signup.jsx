import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartPulse } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ECGLine from "@/components/home/ECGLine";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setError(null);
    // Account system isn't wired up yet — this is a demo gateway to the dashboard.
    navigate("/dashboard");
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-obsidian px-6 py-32">
      <ECGLine className="pointer-events-none absolute inset-x-0 top-1/2 h-32 -translate-y-1/2 opacity-[0.05]" />

      <div className="relative w-full max-w-md border border-panel-line bg-panel p-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center border border-pulse/40 bg-pulse/10">
            <HeartPulse size={18} className="text-pulse" />
          </div>
          <span className="font-display text-xl font-medium text-bone">Cardyx</span>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-pulse">
          Get started
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium text-bone">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-ash">
              Full name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-ash">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-ash">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-ash">
              Confirm password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="border border-pulse/30 bg-pulse/10 px-3.5 py-2.5 text-sm text-pulse">
              {error}
            </p>
          )}

          <Button type="submit" className="mt-2 w-full">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ash">
          Already have an account?{" "}
          <Link to="/login" className="text-pulse hover:underline">
            Log in
          </Link>
        </p>

        <p className="mt-8 border-t border-panel-line pt-4 text-center text-xs text-ash">
          Demo mode — account system isn't connected yet. Creating an
          account takes you straight to the dashboard.
        </p>
      </div>
    </section>
  );
}
