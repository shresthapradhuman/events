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
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { forgotPasswordAction } from "../actions";

type FormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (values: FormData) => {
    startTransition(async () => {
      const response = await forgotPasswordAction(values);
      if (!response.success)
        toast.error(response.message, {
          style: { color: "red" },
        });
      if (response?.success) {
        toast.success(response.message, {
          style: { color: "green" },
        });
        router.push("/");
        router.refresh();
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className="text-base capitalize text-inherit"
                htmlFor={field.name}
              >
                {field.name}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="eg: john@example.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && <Loader2 size={16} className="animate-spin" />}Send
          Reset Email
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
