import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { charactersApi } from "../api/characters";
import { toast } from "sonner";

export function useCharacters() {
  const queryClient = useQueryClient();

  // Get all characters
  const {
    data: characters,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["characters"],
    queryFn: charactersApi.getAll,
  });

  // Get single character
  const useCharacter = (id: string) => {
    return useQuery({
      queryKey: ["character", id],
      queryFn: () => charactersApi.getById(id),
      enabled: !!id,
    });
  };

  // Seed characters mutation
  const seedMutation = useMutation({
    mutationFn: charactersApi.seed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      toast.success("Characters seeded successfully");
    },
    onError: () => {
      toast.error("Failed to seed characters");
    },
  });

  return {
    characters,
    isLoading,
    error,
    useCharacter,
    seedCharacters: seedMutation.mutate,
    isSeeding: seedMutation.isPending,
  };
}
