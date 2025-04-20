import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SocialLoginButton from "./SocialLoginButton";

interface CardWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  question?: string;
  redirectLink?: string;
  redirectTitle?: string;
  socialLogin?: boolean;
}

const CardWrapper = ({
  title,
  description,
  children,
  question,
  redirectLink,
  redirectTitle,
  socialLogin,
}: CardWrapperProps) => {
  return (
    <div className="flex items-center justify-center px-4 py-14 lg:py-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {socialLogin && (
          <CardFooter className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            {/* social login button */}
            <SocialLoginButton />
          </CardFooter>
        )}
        <CardFooter>
          <div className="w-full text-center text-sm">
            {question}
            <Link href={redirectLink || "#"} className="text-primary hover:underline">
              {redirectTitle}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardWrapper;
