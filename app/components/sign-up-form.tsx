"use client";
import { createBrowserClient } from "@supabase/ssr";
import React, { useState } from "react";

const SignupForm = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { displayName },
      },
    });

    if (error) {
      setMessage(error.message);
    } else if (data?.user) {
      setMessage("Check your email for the confirmation link.");
    }

    setLoading(false);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(confirmPassword !== e.target.value ? "Passwords do not match." : "");
    setPassword(e.target.value);
  }

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(e.target.value !== password ? "Passwords do not match." : "");
    setConfirmPassword(e.target.value);
  }

  return (
    <form onSubmit={handleSignup} className="space-y-6">
      {/* Email Input */}
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
      </div>
      {/* Display Name Input */}
      <div>
        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
      </div>
      {/* Password Input */}
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
          className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
      </div>
      {/* Confirm Password Input */}
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
      {message && <p className="text-center text-sm text-red-500">{message}</p>}
    </form>
  );
};

export default SignupForm;
