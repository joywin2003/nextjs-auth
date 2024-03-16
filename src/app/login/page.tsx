"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LabelInputContainer from "@/components/ui/lableinputcontainer";
import BottomGradient from "@/components/ui/buttongradient";

import getErrorMessage from "@/utils/getErrorMessage";
import { loginSchema, TLoginSchema } from "@/utils/types";


export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onLogin = async (data: TLoginSchema) => {
    try {
      const toastId = toast.loading("Logging In");
      const response = await axios.post("/api/users/login", data);
      toastId && toast.dismiss(toastId);

      if (response.data.status === 200) {
        toast.success("Login successful");
        await new Promise<void>((resolve) =>
          setTimeout(() => {
            router.push("/");
            resolve();
          }, 2000)
        );
      } else {
        toast.error(response.data.message);
      }
      
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
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
      <form className="my-8" onSubmit={handleSubmit(onLogin)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            {...register("email")}
            placeholder="Enter your email"
            type="email"
            autoComplete="email"
          />
          {errors?.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            placeholder="Enter your password"
            type="password"
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
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
