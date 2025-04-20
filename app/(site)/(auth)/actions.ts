"use server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/schema/index";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { resend } from "@/lib/resend";
import { prisma } from "@/prisma/client";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import config from "@/lib/config";
import { generatePasswordResetToken, generateVerificationToken } from "./helper";
import EmailVerification from "./templates/EmailVerification";
import { DEFAULT_REDIRECT_URL } from "@/routes";
import ResetPassword from "./templates/ResetPassword";

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
  try {
    const { data, success } = registerSchema.safeParse(values);
    if (!success)
      return {
        success: false,
        message: "Invalid field data.",
      };
    const checkEmailExist = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (checkEmailExist)
      return {
        success: false,
        message: "Email already exists.",
      };
    const hashPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: data.name.toLowerCase(),
        email: data.email.toLowerCase(),
        password: hashPassword,
      },
    });
    if (!newUser) {
      return {
        success: false,
        message: "Failed to register user.",
      };
    }
    if (!newUser.emailVerified) {
      const { token } = await generateVerificationToken(newUser.email);
      const url = `${config.baseUrl}/email-verified?token=${token}`;
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: newUser.email.toLowerCase().trim(),
        subject: "verify your email",
        react: EmailVerification(url, newUser.name),
      });
    }
    return {
      success: true,
      message: "User registered successfully. Please check your email to verify your account.",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "Internal server error.",
    };
  }
};

export const loginAction = async (values: z.infer<typeof loginSchema>, callbackUrl?: string) => {
  const { data, success } = loginSchema.safeParse(values);
  if (!success) return { success: false, message: "Invalid field data." };
  const checkUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  /** check user exist or not */
  if (!checkUser || !checkUser.email || !checkUser.password) {
    return { success: false, message: "Email doesn't exist." };
  }
  /** check user is emailVerified or not */
  if (!checkUser.emailVerified) {
    /** generate the new token */
    const { token } = await generateVerificationToken(checkUser.email);
    const url = `${config.baseUrl}/email-verified?token=${token}`;
    /** resend the verification email */
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: checkUser.email.toLowerCase().trim(),
      subject: "verify your email",
      react: EmailVerification(url, checkUser.name),
    });
    return {
      success: false,
      message:
        "Please verify your email to access your account. Check your inbox or click below to resend the verification email.",
    };
  }
  /** check user is matched */
  const matchPassword = await bcrypt.compare(data.password, checkUser.password);
  if (!matchPassword) {
    return {
      success: false,
      message: "Wrong email and password combination.",
    };
  }
  try {
    await signIn("credentials", {
      email: data?.email,
      password: data?.password,
      redirectTo: callbackUrl || DEFAULT_REDIRECT_URL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid Credentials" };
        default:
          return { success: false, message: "Something went wront" };
      }
    }
    throw error;
  }
};

export const emailVerifiedAction = async (token: string) => {
  const existingToken = await prisma.verificationToken.findFirst({
    where: {
      token,
    },
  });
  if (!existingToken) return { error: "Token does not exist." };
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { success: false, message: "Token has expired." };
  const existingUser = await prisma.user.findFirst({
    where: {
      email: existingToken.identifier,
    },
  });
  if (!existingToken) return { success: false, message: "Email does not exist." };
  await prisma.user.update({
    where: { id: existingUser?.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.identifier,
    },
  });
  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: existingToken.identifier,
        token: existingToken.token,
      },
    },
  });
  if (existingUser) {
    await signIn("credentials", {
      email: existingUser?.email,
      password: existingUser?.password,
    });
    return {
      success: true,
      message: "User verified successfully.",
    };
  }
};

export const forgotPasswordAction = async (values: z.infer<typeof forgotPasswordSchema>) => {
  try {
    const { data, success } = forgotPasswordSchema.safeParse(values);
    if (!success)
      return {
        success: false,
        message: "Invalid field data",
      };
    /** check user exist */
    const user = await prisma.user.findFirst({
      where: {
        email: data.email.toLowerCase(),
      },
    });
    if (!user)
      return {
        success: false,
        message: "User with email doesn't exist.",
      };
    /** generate the reset token */
    const token = await generatePasswordResetToken(user.email);
    const url = `${config.baseUrl}/reset-password?token=${token.token}`;
    /** send password reset mail */
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: user.email.toLowerCase().trim(),
      subject: "verify your email",
      react: ResetPassword({ name: user.name, url }),
    });
    return {
      success: true,
      message: "Password reset email sent successfully. Please check your inbox.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

export const resetPasswordAction = async (
  values: z.infer<typeof resetPasswordSchema>,
  token: string,
) => {
  try {
    if (!token) return { success: false, message: "Token is missing." };
    const { data, success } = resetPasswordSchema.safeParse(values);
    if (!success) return { success: false, message: "Invalid field data." };
    const existingToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });
    if (!existingToken) return { success: false, message: "Invalid token." };
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return { success: false, message: "Token has expired." };
    const existingUser = await prisma.user.findFirst({
      where: {
        email: existingToken.identifier,
      },
    });
    if (!existingUser) return { success: false, message: "Unauthorized user." };
    const hashPassword = await bcrypt.hash(data.password, 10);
    const userUpdate = await prisma.user.update({
      where: {
        email: existingUser.email,
      },
      data: {
        password: hashPassword,
      },
    });
    if (!userUpdate)
      return {
        success: false,
        message: "Something went wrong.",
      };
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: existingToken.identifier,
          token,
        },
      },
    });
    return {
      success: true,
      message: "Password updated successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Internal server error.",
    };
  }
};

export const logoutAction = async () => {
  await signOut();
};
