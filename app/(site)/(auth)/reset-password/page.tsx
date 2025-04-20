import React from "react";
import CardWrapper from "../_components/CardWrapper";
import ResetPasswordForm from "../_components/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <CardWrapper
      title='Reset Password'
      description='Reset your password with new password'
      question='Remember Password? '
      redirectLink='/login'
      redirectTitle='Log In'
    >
      <ResetPasswordForm />
    </CardWrapper>
  );
};

export default ResetPasswordPage;
