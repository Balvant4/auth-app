"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter();

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", user);
      if (!response) {
        console.log("Data fetching error");
        return;
      }
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.username && user.email && user.password));
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6">
          {loading ? "Processing..." : "Signup"}
        </h1>
        <hr className="mb-6" />
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            type="username"
            value={user.username}
            id="username"
            placeholder="Username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full mt-2 p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            id="email"
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full mt-2 p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            value={user.password}
            id="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full mt-2 p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className={`w-full py-2 rounded ${
            buttonDisabled || loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading
            ? "Processing..."
            : buttonDisabled
            ? "Fill The Form"
            : "Signup"}
        </button>
        <Link
          href="/login"
          className="block text-center mt-4 text-indigo-400 hover:underline"
        >
          Visit login page
        </Link>
      </div>
    </div>
  );
}

export default SignupPage;
