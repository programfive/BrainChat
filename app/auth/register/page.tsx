"use client";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthContent } from "../components/auth-content";

const RegisterPage = () => {
  return (
    <AuthContent title="Welcome To BrainChat">
      <RegisterForm />
    </AuthContent>
  );
};

export default RegisterPage;
