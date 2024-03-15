"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import LabelInputContainer from "@/components/ui/lableinputcontainer";
import BottomGradient from "@/components/ui/buttongradient";
import getErrorMessage from "@/utils/getErrorMessage";

type FormDataInput = {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormDataInput>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onLogin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    const toastId = toast.loading("Logging In");
    try{
      console.log(1);
      const response = await axios.post("/api/users/login", formData);
      console.log(2);
      console.log(response);
      if (response.data.status === 200) {
        console.log("Login successful");
        toastId && toast.dismiss(toastId);
        toast.success("Login successful");
        setTimeout(() => {
          router.push("/");
        }, 2000);

      }else{
        console.log("Login failed",response.data.message);
        toast.error(response.data.message);
        toastId && toast.dismiss(toastId);
      }
    }catch(error: unknown){
      const errorMessage = getErrorMessage(error);
      console.log("Login failed",errorMessage);
      toastId && toast.dismiss(toastId);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="m-20 border-2 border-neutral-300 dark:border-neutral-700 max-w-md w-full mx-auto rounded-none md:rounded-2xl  md:p-8 shadow-input bg-white dark:bg-black">
      <Toaster position="top-center" />
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome back to Here Or There Homes
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Log in to access your account and continue your home search journey.
      </p>
      <form className="my-8" onSubmit={onLogin}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>
        <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
          Don't have an account?,{" "}
          <Link className="text-blue-500" href="/signup">
            Sign In here
          </Link>
        </p>
      </form>
    </div>
  );
}

