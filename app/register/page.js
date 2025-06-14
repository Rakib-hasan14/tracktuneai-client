"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import registerImage from "../../public/register.jpg";
import { registerUser } from "@/utils/rest-api/register";

export default function RegisterPage() {
  const Router = useRouter();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const data = await registerUser(form);
      setStatus({ type: "success", message: "Registration successful!" });
      setForm({ first_name: "", last_name: "", email: "", password: "" });

      Cookies.set("token", data.token, { expires: 1 });

      Router.push("/");
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Registration failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-hide alerts after 4 seconds
  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(
        () => setStatus({ type: "", message: "" }),
        4000
      );
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Form Section */}
      <div className="flex flex-col justify-center px-8 md:px-16 py-12 bg-white">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          Create an Account
        </h1>

        {/* Alert */}
        {status.message && (
          <div
            className={`px-4 py-3 rounded relative mb-4 border ${
              status.type === "success"
                ? "bg-green-100 border-green-400 text-green-700"
                : "bg-red-100 border-red-400 text-red-700"
            }`}
            role="alert"
          >
            <strong className="font-bold">
              {status.type === "success" ? "Success! " : "Error! "}
            </strong>
            <span className="block sm:inline">{status.message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name *
            </label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              disabled={loading}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name (optional)
            </label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div className="hidden md:block relative">
        <Image
          src={registerImage}
          alt="Register Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
