"use client";
import { useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schema/index";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerAction } from "../actions";
import { InputPassword } from "@/components/input-password";

type formData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<formData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: formData) => {
    startTransition(async () => {
      const response = await registerAction(values);

      if (response?.success) {
        toast.success(response?.message, {
          style: { color: "green" },
        });
        router.push("/");
      } else {
        toast.error(response?.message, {
          style: { color: "red" },
        });
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid gap-5">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={field.name}
                  className="text-base text-inherit"
                >
                  Full name
                </FormLabel>
                <FormControl>
                  <Input
                    id={field.name}
                    {...field}
                    placeholder="eg: John Doe"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormLabel
                  htmlFor={field.name}
                  className="text-base text-inherit"
                >
                  Password
                </FormLabel>
                <FormControl>
                  <InputPassword
                    id={field.name}
                    {...field}
                    placeholder="********"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isPending}>
          {isPending && <Loader2 size={16} className="animate-spin" />}
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
