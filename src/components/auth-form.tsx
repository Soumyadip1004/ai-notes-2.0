"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { PasswordInput } from "@/components/ui/password-input";
import { useTransition } from "react";
import {
  loginWithCredentialsAction,
  signUpWithCredentialsAction,
} from "@/actions/auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#]/,
      "Password must contain at least one special character",
    ),
});

type AuthFormProps = {
  type: "login" | "sign-up";
};

export default function AuthForm({ type }: AuthFormProps) {
  const isLoginForm = type === "login";

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: isLoginForm ? "Unknown" : "", // important to avoid uncontrolled warnings
      email: "",
      password: "",
    },
  });

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage;
      let title;
      let description;

      if (isLoginForm) {
        errorMessage = (await loginWithCredentialsAction(email, password))
          .errorMessage;
        title = "Logged In";
        description = "You have been successfully logged in";
      } else {
        errorMessage = (
          await signUpWithCredentialsAction(name, email, password)
        ).errorMessage;
        title = "Signed Up";
        description = "You have been successfully signed up";
      }

      if (!errorMessage) {
        toast.success(title, {
          description: description,
        });
        if (isLoginForm) {
          router.replace("/");
        } else {
          router.replace("/login");
        }
      } else {
        toast.error("Error", {
          description: errorMessage,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form action={handleSubmit} className="w-full space-y-4">
        {!isLoginForm && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Full Name"
                    type="text"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Your Email"
                  type="email"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
}
