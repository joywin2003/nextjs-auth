"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import axios from "axios";
import LabelInputContainer from "@/components/ui/lableinputcontainer";
import BottomGradient from "@/components/ui/buttongradient";
import getErrorMessage from "@/utils/getErrorMessage";

type FormDataInput = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState<FormDataInput>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSignUp = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Loading data");
    try {
      const response = await axios.post("api/users/signup", {
        user,
      });
      console.log(response["data"]);
      if (response.data.status === 201) {
        toastId && toast.dismiss(toastId);
        toast.success("Sign up successful");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(response.data.message);
        toastId && toast.dismiss(toastId);
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      console.error("Signup error:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const requiredFields = [
      user.firstname,
      user.lastname,
      user.email,
      user.password,
    ];
    const buttonDisabled = !requiredFields.every((field) => field);
    setButtonDisabled(buttonDisabled);
  }, [user]);

  return (
    <div className="m-20 border-2 border-neutral-300 dark:border-neutral-700 max-w-md w-full mx-auto rounded-none md:rounded-2xl  md:p-8 shadow-input bg-white dark:bg-black">
      <Toaster position="top-center" />
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome back to Here Or There Homes
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Log in to access your account and continue your home search journey.
      </p>

      <form className="my-8" onSubmit={onSignUp}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              name="firstname"
              placeholder="Tyler"
              type="text"
              value={user.firstname}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              name="lastname"
              placeholder="Durden"
              type="text"
              value={user.lastname}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
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
