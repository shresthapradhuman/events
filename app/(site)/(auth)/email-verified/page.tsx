import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EmailVerificationForm from "../_components/EmailVerificationForm";

const EmailVerifiedPage = () => {
  return (
    <div className="flex items-center justify-center py-14 xl:py-24">
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center justify-center"></CardHeader>
        <CardContent>
          <EmailVerificationForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerifiedPage;
