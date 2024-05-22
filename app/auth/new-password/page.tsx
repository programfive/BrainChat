import { NewPasswordForm } from "@/components/auth/new-password-form";
import { AuthContent } from "../components/auth-content";

const NewPasswordPage = () => {
  return (
    <AuthContent title="Reset Password">
      <NewPasswordForm />
    </AuthContent>
  );
};

export default NewPasswordPage;
