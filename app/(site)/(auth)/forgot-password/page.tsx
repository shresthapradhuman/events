import React from "react";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";
import CardWrapper from "../_components/CardWrapper";

const ForgotPassword = () => {
  return (
    <CardWrapper
      title='Forgot Password'
      description='Enter your email to receive reset password email.'
      question='Remember Password? '
      redirectLink='/login'
      redirectTitle='Log In'
    >
      <ForgotPasswordForm />
    </CardWrapper>
  );
};

export default ForgotPassword;
