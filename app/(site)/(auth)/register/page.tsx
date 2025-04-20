import React from "react";
import CardWrapper from "../_components/CardWrapper";
import RegisterForm from "../_components/RegisterForm";

const RegisterPage = () => {
  return (
    <CardWrapper
      title={"Create an account!"}
      description="Enter information below to create your account."
      question="Already have an account ? "
      redirectLink="/login"
      redirectTitle="Log In"
      socialLogin={true}
    >
      <RegisterForm />
    </CardWrapper>
  );
};

export default RegisterPage;
