"use client";
import { Suspense, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { loginSchema } from "@/schema/index";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { InputPassword } from "@/components/input-password";
import { loginAction } from "../actions";

type FormData = z.infer<typeof loginSchema>;

const LoginFormContent = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: FormData) => {
    startTransition(async () => {
      const response = await loginAction(values, callbackUrl!);
      if (!response?.success) {
        toast.error(response?.message, {
          style: { color: "red" },
        });
        form.resetField("password");
      } else {
        router.push("/");
        router.refresh();
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid gap-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={field.name}
                  className="text-base text-inherit"
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    id={field.name}
                    {...field}
                    placeholder="eg: john@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel
                    htmlFor={field.name}
                    className="text-base text-inherit"
                  >
                    Password
                  </FormLabel>
                  <Link
                    href={"/forgot-password"}
                    className="text-sm hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <FormControl>
                  <InputPassword
                    id={field.name}
                    {...field}
                    placeholder="eg: *********"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isPending}>
          {isPending && <Loader2 size={16} className="animate-spin" />}
          Login
        </Button>
      </form>
    </Form>
  );
};

export default function LoginForm() {
  return (
    <Suspense>
      <LoginFormContent />
    </Suspense>
  );
}
