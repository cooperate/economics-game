import { supabaseBrowserClient } from '@/utils/supabase/browser-client';

const useGameEvents = () => {
  const supabase = supabaseBrowserClient();
  // Emit a new event
  const emit = async (gameId: string, eventType: string, metadata = {}) => {
    const { data, error } = await supabase
      .from('events')
      .insert([{ game_id: gameId, event_type: eventType, metadata }]);

    if (error) {
      console.error('Error emitting event:', error);
      return null;
    }
    return data;
  };

  // Listen for new events for a specific gameId
  const listen = (gameId: string, callback: (payload: any) => void) => {
    const subscription = supabase
    .channel(gameId)
    .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'events',
            filter: `game_id=eq.${gameId}`,
        },
        async (payload) => {
            callback(payload);
        }
    )
      .subscribe();

    // Unsubscribe function to call on component unmount
    const unsubscribe = () => {
      supabase.removeChannel(subscription);
    };

    return unsubscribe;
  };

  return { emit, listen };
};

export default useGameEvents;
