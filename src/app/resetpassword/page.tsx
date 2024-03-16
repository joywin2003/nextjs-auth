"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LabelInputContainer from "@/components/ui/lableinputcontainer";
import BottomGradient from "@/components/ui/buttongradient";

import getErrorMessage from "@/utils/getErrorMessage";
import { resetpasswordSchema, TResetpasswordSchema } from "@/utils/types";

export default function resetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TResetpasswordSchema>({
    resolver: zodResolver(resetpasswordSchema),
  });
  const [token, setToken] = useState("");
  const router = useRouter();

  const resetPassword = async (data: TResetpasswordSchema) => {
    try {
      const toastId = toast.loading("Resetting password...");
      const response = await axios.patch("/api/users/resetpassword", {
        password: data.password,
        token,
      });
      console.log(response.data);
      await new Promise<void>((resolve) =>
        setTimeout(() => {
          toast.dismiss(toastId);
          toast.success("Password reset successful");
          router.push("/");
          resolve();
        }, 2000)
      );
      reset();
    } catch (error: unknown) {
      console.error("Error resetting password:", getErrorMessage(error));
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="m-20 border-2 border-neutral-300 dark:border-neutral-700 max-w-md w-full mx-auto rounded-none md:rounded-2xl  md:p-8 shadow-input bg-white dark:bg-black">
      <Toaster position="top-center" />
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Add a new password
      </h2>
      <form className="my-8" onSubmit={handleSubmit(resetPassword)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500">{`${errors.password.message}`}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">Confirm Password</Label>
          <Input
            {...register("confirmpassword")}
            placeholder="Confirm Password"
            type="password"
          />
          {errors.confirmpassword && (
            <p className="text-red-500">{`${errors.confirmpassword.message}`}</p>
          )}
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isSubmitting}
        >
          Reset Password &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}
