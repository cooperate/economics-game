"use client";

import { supabaseBrowserClient } from "@/utils/supabase/browser-client";
import { fetchGameIdFromRoom, fetchPlayersFromRoom } from "@/actions/index";
import { useEffect, useState } from "react";
import { Database, Tables } from "types/supabase";

const Room = ({ params }: { params: { slug: string } }) => {
  const supabase = supabaseBrowserClient();
  const [room, setRoom] = useState(null);
  const [players, setPlayers] = useState<Tables<"players">[] | null>(null);

  useEffect(() => {
    // Async function to set up subscription and initial fetch
    const setupSubscription = async () => {
        // Fetch initial room data
        const roomData = await fetchRoomData(params.slug);
        if (!roomData) {
            console.error("Error: Room not found");
            return;
        }

        const gameId = roomData.game_id;

        // Fetch initial players
        const initialPlayers = await fetchPlayersFromRoom(roomData.room_id);
        setPlayers(initialPlayers);

        // Set up real-time subscription
        const subscription = supabase
            .channel(params.slug)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'game_players',
                    filter: `game_id=eq.${gameId}`,
                },
                async (payload) => {
                    console.log('Change received!', payload);
                    const updatedPlayers = await fetchPlayersFromRoom(roomData.room_id);
                    setPlayers(updatedPlayers);
                }
            )
            .subscribe();

        // Cleanup function to remove subscription
        return () => {
            supabase.removeChannel(subscription);
        };
    };

    // Call the async function
    const cleanup = setupSubscription();

    // Cleanup function
    return () => {
        cleanup.then(fn => fn?.());
    };
}, []);

  const fetchRoomData = async (roomCode: string): Promise<Tables<"rooms">> => {
    const { data: roomData, error } = await supabase
      .from("rooms")
      .select()
      .eq("room_code", roomCode)
      .single();

    if (error) {
      console.error("Error fetching room data:", error);
      throw error;
    }

    // Fetch players for room
    const players = await fetchPlayersFromRoom(roomData.room_id);
    setPlayers(players);

    return roomData;
  };

  const startGame = () => {
    // Handle game start logic
  };

  return (
    <div>
      <h1>Room Code: {params.slug}</h1>
      <ul>
        {players?.map((player) => (
          <li key={player.player_id}>{player.display_name}</li>
        ))}
      </ul>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default Room;
