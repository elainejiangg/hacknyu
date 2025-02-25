"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("Sending data:", formData);

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Registration failed");
      }

      // Registration successful
      router.push("/tutorial");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="relative container max-w-md mx-auto h-screen flex flex-col items-center justify-center">
        <Card className="w-full bg-white/5 border-white/10 p-8 space-y-6">
          <h1 className="text-2xl font-pixel text-center pixel-corners bg-white/5 px-6 py-2">
            JOIN THE SCHOOL
          </h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-pixel" htmlFor="username">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-pixel text-white focus:outline-none focus:border-white/40"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-pixel" htmlFor="email">
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-pixel text-white focus:outline-none focus:border-white/40"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-pixel" htmlFor="password">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-pixel text-white focus:outline-none focus:border-white/40"
                required
              />
            </div>

            <Button
              className="w-full font-pixel py-6 bg-white/10 hover:bg-white/20 border-white/20 mt-6"
              type="submit"
              disabled={loading}
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </Button>
          </form>

          <div className="text-center text-sm font-pixel text-white/60">
            Already have an account?{" "}
            <a href="/login" className="text-white hover:underline">
              Log in
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
