"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useScreen } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const screen = useScreen();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="w-full pt-4 md:pt-6 space-y-4 ">
      <div className="flex  justify-center items-center">
        <hr className="flex-1 border-border" />
        <div className="w-40 flex justify-center text-sm">
          <span className="bg-background px-2 text-gray-500">Or continue with</span>
        </div>
        <hr className="flex-1  border-border" />
      </div>
      <div className="flex gap-4 items-center   ">
        <Button
          size="sm"
          className="w-full"
          variant="outline"
          onClick={() => onClick("google")}
        >
          <FcGoogle className="h-5 w-5" />
        </Button>
        <Button
          size="sm"
          className="w-full"
          variant="outline"
          onClick={() => onClick("github")}
        >
          <FaGithub className="h-5 w-5" />
        </Button>
      </div>
    </div>
    
  );
};
