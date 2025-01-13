import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
      toast.success("Login successfully");
      navigate("/dashboard");
    } catch (err) {
      setError(err);
      toast.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold">Login</h1>
          <p className="mt-2 text-gray-500">
            Welcome back! Please login to your account.
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              type="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <Input
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              type="password"
              required
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
