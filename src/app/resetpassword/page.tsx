"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import axios from "axios";
import LabelInputContainer from "@/components/ui/lableinputcontainer";
import BottomGradient from "@/components/ui/buttongradient";

type FormDataInput = {
  password: string;
  repeatpassword: string;
};

export default function resetPassword() {
  const [formData, setFormData] = useState<FormDataInput>({
    password: "",
    repeatpassword: "",
  });
  const [token, setToken] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const resetPassword = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.patch("/api/users/resetpassword", {password:formData.password, token});
      console.log(response.data);
      router.push("/");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
}, []);



  return (
    <div>
      <div className="m-20 border-2 border-neutral-300 dark:border-neutral-700 max-w-md w-full mx-auto rounded-none md:rounded-2xl  md:p-8 shadow-input bg-white dark:bg-black">
        <Toaster />
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Add a new password
        </h2>

        <form className="my-8" onSubmit={resetPassword}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="twitterpassword">Re-enter Password</Label>
            <Input
              id="repeatpassword"
              placeholder="••••••••"
              type="repeatpassword"
              value={formData.repeatpassword}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Reset Password &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}
