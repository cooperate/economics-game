"use client";

import { supabaseBrowserClient } from "@/utils/supabase/browser-client";
import { fetchGameIdFromRoom, fetchPlayersFromRoom } from "@/actions/index";
import { useEffect, useState } from "react";
import { Database, Tables } from "types/supabase";
import { useRouter } from "next/navigation";

const Room = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const supabase = supabaseBrowserClient();
  const [room, setRoom] = useState<Tables<'rooms'> | null>(null);
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

        setRoom(roomData);

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
    router.push(`/game/${room?.game_id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Room Code: {params.slug}</h1>
            <p className="mb-4 text-gray-800">Players: {players?.length} / {room?.max_players}</p>
            <ul className="list-disc list-inside mb-4">
                {players?.map((player) => (
                    <li key={player.player_id} className="text-gray-700">{player.display_name}</li>
                ))}
            </ul>
            <button 
                onClick={startGame} 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Start Game
            </button>
        </div>
    </div>
);

};

export default Room;
