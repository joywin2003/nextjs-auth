"use client";

import React from "react";
import { toast, Toaster } from "sonner";

export default function ProfilePage() {
  toast.success("Successfully toasted!");
  return (
    <div>
      <Toaster />
      <div>Profile page</div>
    </div>
  );
}
