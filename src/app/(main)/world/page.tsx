"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { worldStateApi } from "../../../lib/api/world-state";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EventSeverity } from "@/lib/types";
import {
  AlertTriangle,
  Clock,
  MapPin,
  Sparkles,
  Zap,
  XCircle,
  MessageSquare,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function WorldPage() {
  const queryClient = useQueryClient();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(false);

  const { data: events, isLoading } = useQuery({
    queryKey: ["world-events", showInactive],
    queryFn: () =>
      showInactive ? worldStateApi.getAll() : worldStateApi.getActive(),
    refetchInterval: 30000,
  });

  const generateEventMutation = useMutation({
    mutationFn: worldStateApi.generateRandom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["world-events"] });
      toast.success("A new world event has occurred!");
    },
    onError: () => {
      toast.error("Failed to generate world event");
    },
  });

  const deactivateEventMutation = useMutation({
    mutationFn: (eventId: string) => worldStateApi.deactivate(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["world-events"] });
      toast.success("Event has been resolved");
      setSelectedEvent(null);
    },
    onError: () => {
      toast.error("Failed to deactivate event");
    },
  });

  const getSeverityColor = (severity: EventSeverity) => {
    switch (severity) {
      case EventSeverity.LOW:
        return "bg-blue-900/30 text-blue-400 border-blue-700/50";
      case EventSeverity.MEDIUM:
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700/50";
      case EventSeverity.HIGH:
        return "bg-orange-900/30 text-orange-400 border-orange-700/50";
      case EventSeverity.CRITICAL:
        return "bg-red-900/30 text-red-400 border-red-700/50";
      default:
        return "bg-slate-900/30 text-slate-400 border-slate-700/50";
    }
  };

  const getSeverityIcon = (severity: EventSeverity) => {
    switch (severity) {
      case EventSeverity.LOW:
        return <Clock className="h-5 w-5" />;
      case EventSeverity.MEDIUM:
        return <AlertTriangle className="h-5 w-5" />;
      case EventSeverity.HIGH:
        return <Zap className="h-5 w-5" />;
      case EventSeverity.CRITICAL:
        return <AlertTriangle className="h-5 w-5 animate-pulse" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto" />
          <p className="text-slate-400">Loading world state...</p>
        </div>
      </div>
    );
  }

  const activeEvents = events?.filter((e) => e.isActive) || [];
  const inactiveEvents = events?.filter((e) => !e.isActive) || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          World Events
        </h1>
        <p className="text-slate-400">Major events shaping the realm</p>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button
          onClick={() => generateEventMutation.mutate()}
          disabled={generateEventMutation.isPending}
          size="lg"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {generateEventMutation.isPending
            ? "Generating..."
            : "Generate Random Event"}
        </Button>
        <Button
          onClick={() => setShowInactive(!showInactive)}
          variant="outline"
          size="lg"
        >
          {showInactive ? (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Show Active Only
            </>
          ) : (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Show All Events
            </>
          )}
        </Button>
      </div>

      {/* Active Events */}
      {activeEvents.length === 0 && !showInactive ? (
        <motion.div
          className="flex flex-col items-center justify-center min-h-[40vh] space-y-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Sparkles className="h-16 w-16 text-slate-600" />
          <h2 className="text-2xl font-semibold text-slate-400">
            The Realm is Peaceful
          </h2>
          <p className="text-slate-500">
            No major events are occurring at this time
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {/* Stats */}
          <div className="flex justify-center gap-8 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-400">
                {activeEvents.length}
              </p>
              <p className="text-sm text-slate-400">Active Events</p>
            </div>
            {showInactive && (
              <div>
                <p className="text-2xl font-bold text-slate-500">
                  {inactiveEvents.length}
                </p>
                <p className="text-sm text-slate-400">Resolved Events</p>
              </div>
            )}
          </div>

          {/* Active Events List */}
          {activeEvents.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-purple-300 mb-4">
                Active Events
              </h2>
              <AnimatePresence mode="popLayout">
                {activeEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`overflow-hidden border-l-4 ${
                        event.severity === EventSeverity.CRITICAL
                          ? "border-l-red-500"
                          : event.severity === EventSeverity.HIGH
                          ? "border-l-orange-500"
                          : event.severity === EventSeverity.MEDIUM
                          ? "border-l-yellow-500"
                          : "border-l-blue-500"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <div
                              className={`p-2 rounded-lg ${getSeverityColor(
                                event.severity
                              )}`}
                            >
                              {getSeverityIcon(event.severity)}
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-xl mb-2">
                                {event.eventName}
                              </CardTitle>
                              <CardDescription className="text-base">
                                {event.description}
                              </CardDescription>
                            </div>
                          </div>
                          <span
                            className={`text-xs px-3 py-1 rounded-full border uppercase font-semibold ${getSeverityColor(
                              event.severity
                            )}`}
                          >
                            {event.severity}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Affected Locations */}
                        {event.affectedLocations &&
                          event.affectedLocations.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Affected Locations
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {event.affectedLocations.map(
                                  (location, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700"
                                    >
                                      {location}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {/* Effects */}
                        {event.effects &&
                          Object.keys(event.effects).length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-slate-400 uppercase">
                                Effects
                              </p>
                              <div className="space-y-1">
                                {event.effects.moodShift && (
                                  <p className="text-sm text-purple-300">
                                    <span className="text-slate-400">
                                      Mood:
                                    </span>{" "}
                                    {event.effects.moodShift}
                                  </p>
                                )}
                                {event.effects.behaviorChange && (
                                  <p className="text-sm text-pink-300">
                                    <span className="text-slate-400">
                                      Behavior:
                                    </span>{" "}
                                    {event.effects.behaviorChange}
                                  </p>
                                )}
                                {event.effects.knowledgeGained && (
                                  <p className="text-sm text-blue-300">
                                    <span className="text-slate-400">
                                      Knowledge:
                                    </span>{" "}
                                    {event.effects.knowledgeGained}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                        {/* Timestamp & Duration */}
                        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>
                              Started {format(new Date(event.createdAt), "PPp")}
                            </span>
                          </div>
                          {event.expiresAt && (
                            <span>
                              Expires {format(new Date(event.expiresAt), "PPp")}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setSelectedEvent(event.id)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Resolve Event
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Navigate to affected characters or show more details
                              toast.info("This would show affected characters");
                            }}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            View Impact
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Inactive Events List */}
          {showInactive && inactiveEvents.length > 0 && (
            <div className="space-y-2 mt-8">
              <h2 className="text-xl font-semibold text-slate-500 mb-4">
                Resolved Events
              </h2>
              <div className="space-y-4 opacity-60">
                {inactiveEvents.map((event) => (
                  <Card key={event.id} className="border-slate-800/50">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="text-slate-600">
                          {getSeverityIcon(event.severity)}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-slate-400">
                            {event.eventName}
                          </CardTitle>
                          <CardDescription>{event.description}</CardDescription>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-500">
                          Resolved
                        </span>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Deactivate Confirmation Dialog */}
      <AlertDialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resolve This Event?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark the event as resolved and it will no longer affect
              the world state. Characters will gradually return to their normal
              behavior.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedEvent) {
                  deactivateEventMutation.mutate(selectedEvent);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Resolve Event
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
