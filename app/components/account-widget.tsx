'use client';

import SignupForm from "@/components/sign-up-form";
import LoginForm from "@/components/login-form";
import { useState } from "react";

const AccountWidget = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-gray-700">
        Economics Game
      </h1>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("login")}
          className={`px-4 py-2 ${
            activeTab === "login"
              ? "text-indigo-600 font-bold"
              : "text-gray-600"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab("signup")}
          className={`px-4 py-2 ${
            activeTab === "signup"
              ? "text-indigo-600 font-bold"
              : "text-gray-600"
          }`}
        >
          Sign Up
        </button>
      </div>
      {activeTab === "signup" ? <SignupForm /> : <LoginForm />}
    </>
  );
};

export default AccountWidget;
