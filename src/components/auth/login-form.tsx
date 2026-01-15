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
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Optional: if you use a cn() helper for conditional classes

// ✅ 1. Define Zod schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(50, "Password too long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, isLoggingIn } = useAuth();

  // ✅ 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ✅ 3. Submit handler
  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <Card className="w-full max-w-md">
       <Link href="/">
        <motion.div
          className="flex justify-center items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-7 h-7 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-3 h-3" />
          </div>
          <span className="text-2xl font-bold bg-linear-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
            LoreBot
          </span>
        </motion.div>
      </Link>
      <CardHeader>
        <CardTitle className="text-3xl text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center">
          Enter the realm once more
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Submit */}
          <Button type="submit" className="w-full cursor-pointer" disabled={isLoggingIn}>
            {isLoggingIn ? "Entering..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          New to the realm?{" "}
          <Link href="/register" className="text-purple-400 hover:underline">
            Create an account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
