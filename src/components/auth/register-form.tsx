"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/lib/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils"; // optional utility for conditional classes

// ✅ 1. Define Zod schema
const registerSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(20, "Username must be less than 20 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  displayName: z.string().optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password too long"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register: registerUser, isRegistering } = useAuth();

  // ✅ 2. Setup React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      displayName: "",
      password: "",
    },
  });

  // ✅ 3. Submit handler
  const onSubmit = (data: RegisterFormValues) => {
    registerUser(data);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Join the Realm
        </CardTitle>
        <CardDescription className="text-center">
          Create your account to begin your journey
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-slate-200"
            >
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="adventurer123"
              className={cn("mt-2", errors.username && "border-red-500")}
              {...register("username")}
            />
            {errors.username && (
              <p className="text-sm text-red-400">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-200"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={cn("mt-2", errors.email && "border-red-500")}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-200"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className={cn("mt-2", errors.password && "border-red-500")}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          {/* Display Name (Optional) */}
          <div className="space-y-2">
            <label
              htmlFor="displayName"
              className="text-sm font-medium text-slate-200"
            >
              Display Name (Optional)
            </label>
            <Input
              id="displayName"
              type="text"
              placeholder="The Brave Adventurer"
              className={cn("mt-2", errors.displayName && "border-red-500")}
              {...register("displayName")}
            />
            {errors.displayName && (
              <p className="text-sm text-red-400">
                {errors.displayName.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isRegistering}>
            {isRegistering ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:underline">
            Login here
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
