import { ResetForm } from "@/components/auth/reset-form";
import { AuthContent } from "../components/auth-content";

const ResetPage = () => {
  return (
    <AuthContent title="Forgot Password">
      <ResetForm />
    </AuthContent>
  );
};

export default ResetPage;
