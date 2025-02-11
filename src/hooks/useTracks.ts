
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Track } from '../types/track';

export const useTracks = () => {
  return useQuery({
    queryKey: ['tracks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .order('play_count', { ascending: false });
      
      if (error) throw error;
      return data as Track[];
    }
  });
};

export const useNewTracks = () => {
  return useQuery({
    queryKey: ['new-tracks'],
    queryFn: async () => {
      // Получаем дату неделю назад
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .gte('created_at', weekAgo.toISOString())
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Track[];
    }
  });
};

export const useUpdatePlayCount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (trackId: string) => {
      const { error } = await supabase.rpc('increment_play_count', {
        track_id: trackId
      });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    }
  });
};
