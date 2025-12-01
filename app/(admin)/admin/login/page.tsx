"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { adminLoginSchema } from "@/lib/validations";
import type { z } from "zod";
import {
  FaShieldAlt,
  FaUser,
  FaLock,
  FaSpinner,
  FaMapMarkerAlt,
} from "react-icons/fa";

type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: AdminLoginFormData) => {
    try {
      const result = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials", {
          description: "Please check your username and password and try again.",
        });
      } else if (result?.ok) {
        toast.success("Welcome back!", {
          description: "You have been successfully signed in.",
        });

        // Small delay to ensure cookie is set, then use Next.js router
        // The delay allows the browser to process the Set-Cookie header
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Use router.push with replace to avoid back button issues
        // Then refresh to ensure middleware sees the new session
        router.replace("/admin");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong", {
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="from-background via-muted/20 to-background flex min-h-screen items-center justify-center bg-linear-to-br px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="border-border/50">
          <CardHeader className="space-y-3 text-center">
            <div className="bg-primary/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
              <FaShieldAlt className="text-primary h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Admin Login
              </CardTitle>
              <CardDescription className="text-base">
                Sign in to manage tours and orders
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <FieldContent>
                    <div className="relative">
                      <FaUser className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        autoComplete="username"
                        autoFocus
                        disabled={isSubmitting}
                        aria-invalid={!!errors.username}
                        {...register("username")}
                        className="h-11 pl-10"
                      />
                    </div>
                    <FieldError errors={[errors.username]} />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <FieldContent>
                    <div className="relative">
                      <FaLock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        disabled={isSubmitting}
                        aria-invalid={!!errors.password}
                        className="h-11 pl-10"
                        {...register("password")}
                      />
                    </div>
                    <FieldError errors={[errors.password]} />
                  </FieldContent>
                </Field>

                <Button
                  type="submit"
                  className="h-11 w-full text-base font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 border-t pt-6">
            <div className="flex items-center justify-center gap-2">
              <FaMapMarkerAlt className="text-muted-foreground h-3 w-3" />
              <p className="text-muted-foreground text-center text-sm">
                Secure admin access for authorized personnel only
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
