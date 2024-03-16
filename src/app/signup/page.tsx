"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import axios from "axios";
import LabelInputContainer from "@/components/ui/lableinputcontainer";
import BottomGradient from "@/components/ui/buttongradient";
import getErrorMessage from "@/utils/getErrorMessage";
import { signupSchema, TSignupSchema } from "@/utils/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });
  const [response, setResponse] = useState<any>(null);

  const onSignUp = async (user: TSignupSchema) => {
    const toastId = toast.loading("Loading data");
    try {
      const response = await axios.post("api/users/signup", {
        user,
      });
      setResponse(response.data);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      console.error("Signup error:", errorMessage);
      toast.error(errorMessage);
    } finally {
      toastId && toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (response && response.status === 201) {
      toast.success("Sign up successful");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else if (response && response.message) {
      toast.error(response.message);
    }
  }, [response]);

  return (
    <div className="m-20 border-2 border-neutral-300 dark:border-neutral-700 max-w-md w-full mx-auto rounded-none md:rounded-2xl  md:p-8 shadow-input bg-white dark:bg-black">
      <Toaster position="top-center" />
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome back to Here Or There Homes
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Log in to access your account and continue your home search journey.
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSignUp)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              {...register("firstname")}
            />
            {errors.firstname && (
              <p className="text-red-500 mt-1">{errors.firstname.message}</p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              {...register("lastname")}
            />
            {errors.lastname && (
              <p className="text-red-500 mt-1">{errors.lastname.message}</p>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="Enter a email address"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Enter a password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isSubmitting}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
        <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
          Have an account?,{" "}
          <Link className="text-blue-500" href="/login">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
