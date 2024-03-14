"use client";

import React from "react";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProfilePage() {

  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  toast.success("Successfully toasted!");
  return (
    <div>
      <Toaster />
      <div>Profile page</div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
