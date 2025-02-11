
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Track } from '@/types/track';
import { useAuth } from '@/contexts/AuthContext';

export const useLikedTracks = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['liked-tracks', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('liked_tracks')
        .select(`
          track_id,
          tracks (*)
        `)
        .eq('user_id', userId);
      
      if (error) throw error;
      return data.map(item => item.tracks) as Track[];
    },
    enabled: !!userId,
  });
};

export const useToggleLikeTrack = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    mutationFn: async ({ trackId, isLiked }: { trackId: string; isLiked: boolean }) => {
      if (!userId) throw new Error('User not authenticated');

      if (isLiked) {
        const { error } = await supabase
          .from('liked_tracks')
          .delete()
          .eq('user_id', userId)
          .eq('track_id', trackId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('liked_tracks')
          .insert({ user_id: userId, track_id: trackId });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['liked-tracks'] });
    },
  });
};
