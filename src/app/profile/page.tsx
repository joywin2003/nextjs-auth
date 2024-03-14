"use client";

import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
      toast.success("Logout successful");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axios.get("/api/users/user");
      console.log(response.data);
      setData(response.data.user.firstName);
    } catch (error) {
      console.error("Error getting user info:", error);
    }
  };

  const resetPassword = async () => {
    try {
      const response = await axios.post("/api/users/resetpassword",);
      console.log(response.data);
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  }

  return (
    <div>
      <Toaster />
      <div>Profile page</div>
      <button onClick={onLogout}>Logout</button>
      <button onClick={getUserInfo}>Get user info</button>
      <button onClick={resetPassword}>Reset password</button>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          ""
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
    </div>
  );
}
