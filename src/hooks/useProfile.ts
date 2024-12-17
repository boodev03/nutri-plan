import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { getUserProfile } from "../services/supabase";

export function useProfile() {
    const { user } = useAuth();

    return useQuery({
        queryKey: ["profile", user?.id],
        queryFn: () => getUserProfile(user!.id),
        enabled: !!user, // Only run query if user exists
        staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    });
} 