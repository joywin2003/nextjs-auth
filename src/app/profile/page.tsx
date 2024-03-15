"use client";

import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<User>();

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error:unknown) {
      console.error("Error during logout:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axios.get("/api/users/user");
      console.log(response.data.user.firstName);
      setUserInfo(response.data.user);
    } catch (error:unknown) {
      console.error("Error getting user info:", error);
      toast.error("Failed to fetch user info. Please try again.");
    }
  };

  const resetPassword = async () => {
    try {
      const response = await axios.post("/api/users/resetpassword");
      if (response.data.success) {
        toast.success("Password reset successful");

      } else {
        toast.error("Password reset failed. Please try again.");
      }
    } catch (error:unknown) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-center" />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">User Profile</h1>
        <p className="text-gray-600">Welcome back, {userInfo?.firstName || "User"}!</p>
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className="btn-primary"
          onClick={getUserInfo}
        >
          Get User Info
        </button>
        <button
          className="btn-primary"
          onClick={resetPassword}
        >
          Reset Password
        </button>
        <button
          className="btn-danger"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
      <div className="text-center">
        {userInfo && (
          <h2 className="text-lg text-white font-semibold">
            User Details: {userInfo?.firstName} {userInfo?.lastName}
          </h2>
        )}
      </div>
    </div>
  );
}
