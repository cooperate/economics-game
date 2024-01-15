"use client";

import { useState } from "react";
import { supabaseBrowserClient } from "@/utils/supabase/browser-client";
import { useRouter } from "next/navigation";
import useSupabaseSession from "app/hooks/useSupabaseSession";

function generateRoomCode(length = 6) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const CreateRoom = () => {
  const router = useRouter();
  const supabase = supabaseBrowserClient();
  const [maxPlayers, setMaxPlayers] = useState(3);
  const session = useSupabaseSession();

  const createRoom = async () => {
    const roomCode = generateRoomCode();

    // Insert room into Supabase
    const { data: gameData, error: gameError } = await supabase
      .from("games")
      .insert({ max_players: maxPlayers })
      .select();

    if (gameError) {
      console.error("Error creating game:", gameError);
      return;
    }

    if (!session) {
      console.error("No session found");
      return;
    }

    const { data: roomData, error: roomError } = await supabase
      .from("rooms")
      .insert({
        room_code: roomCode,
        max_players: maxPlayers,
        game_id: gameData?.[0].game_id,
      })
      .select();

    //create player in supabase
    const { data: playerData, error: userError } = await supabase
      .from("players")
      .insert([
        {
          user_id: session.user.id,
          display_name: "Room King",
        },
      ])
      .select();
    //add player to game in supabase
    const { data: gamePlayerData, error: playerError } = await supabase
      .from("game_players")
      .insert({
        player_id: playerData?.[0].player_id ?? "",
        game_id: roomData?.[0].game_id ?? "",
      })
      .select();

    //add player to room in supabase
    const { data: roomPlayerData, error: roomPlayerError } = await supabase
      .from("room_users")
      .insert({
        user_id: session.user.id,
        room_id: roomData?.[0].room_id ?? "",
      })
      .select();

    if (roomError) {
      console.error("Error creating room:", roomError);
    } else {
      try {
        // Redirect to the room page
        router.push(`/room/${roomData?.[0].room_code}`);
      } catch (error) {
        console.error("Error pushing to room:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
        <label
          htmlFor="maxPlayers"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Max Players
        </label>
        <input
          id="maxPlayers"
          type="number"
          min="3"
          max="20"
          value={maxPlayers}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            setMaxPlayers(newValue > 20 ? 20 : newValue);
          }}
          className="mb-4 w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
        />
        <button
          onClick={createRoom}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
