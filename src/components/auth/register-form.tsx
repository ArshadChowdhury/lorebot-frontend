"use client";

import { useState } from "react";
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

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { register, isRegistering } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      username,
      email,
      password,
      displayName: displayName || undefined,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Join the Realm
        </CardTitle>
        <CardDescription className="text-center">
          Create your account to begin your journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
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
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isRegistering}>
            {isRegistering ? "Creating Account..." : "Register"}
          </Button>
        </form>
        <p className="text-center text-sm text-slate-400 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:underline">
            Login here
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
