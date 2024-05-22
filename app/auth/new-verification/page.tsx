import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { AuthContent } from "../components/auth-content";

const NewVerificationPage = () => {
  return (
    <AuthContent title="Verification">
      <NewVerificationForm />
    </AuthContent>
  );
};

export default NewVerificationPage;
