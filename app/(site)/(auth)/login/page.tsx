import React from "react";
import CardWrapper from "../_components/CardWrapper";
import LoginForm from "../_components/LoginForm";

const LoginPage = () => {
  return (
    <CardWrapper
      title={"Welcome Back!"}
      description={"Login to access your account"}
      socialLogin={true}
      redirectLink="/register"
      question={`Don't have an account ? `}
      redirectTitle="Register"
    >
      <LoginForm />
    </CardWrapper>
  );
};

export default LoginPage;
