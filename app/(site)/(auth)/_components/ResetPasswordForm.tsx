"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPasswordSchema } from "@/schema/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { InputPassword } from "@/components/input-password";
import { resetPasswordAction } from "../actions";

type FormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (values: FormData) => {
    startTransition(async () => {
      const response = await resetPasswordAction(values, token);

      if (response?.success) {
        toast.success(response.message, {
          style: { color: "green" },
        });
        router.push("/login");
        router.refresh();
      } else {
        toast.error(response.message, {
          style: { color: "red" },
        });
      }
    });
  };
  React.useEffect(() => {
    if (searchParams.get("error") == "invalid_token") {
      toast("Password reset link is invalid or has expired.");
    }
  }, [searchParams]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid gap-4">
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-base capitalize text-inherit"
                  htmlFor={field.name}
                >
                  Password
                </FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    id={field.name}
                    placeholder="Enter new password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-base capitalize text-inherit"
                  htmlFor={field.name}
                >
                  Confrim Password
                </FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    id={field.name}
                    placeholder="Confirm password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" size={16} />}
          Reset Password
        </Button>
      </form>
    </Form>
  );
};

export default function ResetPasswordForm() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}
