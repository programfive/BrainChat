"use client";
import { LoginForm } from "@/components/auth/login-form";
import { AuthContent } from "../components/auth-content";

const LoginPage = () => {
  return <>
  <AuthContent title='Welcome Back'>
    <LoginForm/>
  </AuthContent>
  </>;
};

export default LoginPage;
