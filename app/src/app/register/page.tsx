import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        credentials: "include", // Important for cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        // Registration successful, user is now logged in
        router.push("/dashboard");
      } else {
        const data = await response.json();
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      setError("Failed to register");
      console.error("Registration error:", error);
    }
  };

  return <div>{/* Render your form here */}</div>;
};

export default Register;
