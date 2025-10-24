"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth"; // adjust path
import React from "react";

export default function MyProfile() {
  // prefer values from your useAuth hook (it already has the query), if available
  const { isLoadingProfile, isAuthenticated, profileData } = useAuth() as any;

  // Fallback: directly call the query if profileData is missing — this is robust during dev
  const {
    data: directProfileData,
    isLoading: isLoadingDirect,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: authApi.getProfile,
    enabled: !profileData && isAuthenticated, // only run if hook didn't provide data and user is authenticated
    retry: false,
  });

  // choose actual data (support both shapes: { user } or user)
  const raw = profileData ?? directProfileData;
  const user = raw?.user ?? raw ?? null;

  // Debugging helper (remove once confirmed)
  // console.log("profileData(from hook):", profileData);
  // console.log("directProfileData:", directProfileData);
  // console.log("resolved user:", user);

  if (!isAuthenticated) {
    return (
      <div className="text-center text-slate-400 mt-6">
        Please log in to view your profile.
      </div>
    );
  }

  const loading = isLoadingProfile || isLoadingDirect;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
        <span className="ml-2 text-slate-300">Loading your profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 mt-6">
        Failed to load profile.
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-slate-400 mt-6">
        No profile data found.
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-3xl text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          My Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-slate-200">
        <div className="space-y-1">
          <p className="text-sm text-slate-400">Username</p>
          <p className="font-semibold">{user.username}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-slate-400">Display Name</p>
          <p className="font-semibold">{user.displayName || "Not set"}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-slate-400">Email</p>
          <p className="font-semibold">{user.email}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-slate-400">Level</p>
          <p className="font-semibold">Level {user.level}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-slate-400">Experience Points</p>
          <p className="font-semibold">{user.experiencePoints}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-slate-400">Member Since</p>
          <p className="font-semibold">
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "-"}
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full text-purple-300 border-purple-300 hover:bg-purple-300 hover:text-black mt-3"
          onClick={() => window.location.reload()}
        >
          Refresh Profile
        </Button>
      </CardContent>
    </Card>
  );
}
