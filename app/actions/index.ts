"use server";

import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Tables } from "types/supabase";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function joinRoom(
  userId: string,
  roomCode: string,
  displayName: string
) {
  const { data: roomData, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("room_code", roomCode)
    .single();

  if (error || !roomData) {
    throw "Invalid room code. Please try again.";
  }

  //create player in supabase
  const { data: playerData, error: userError } = await supabase
    .from("players")
    .insert([
      {
        user_id: userId,
        display_name: displayName,
      },
    ])
    .select();

  //add player to game in supabase
  const { data: gamePlayerData, error: playerError } = await supabase
    .from("game_players")
    .insert([
      {
        player_id: playerData?.[0].player_id ?? "",
        game_id: roomData.game_id,
      },
    ])
    .single();

  //add player to room in supabase
  const { data: roomPlayerData, error: roomPlayerError } = await supabase
    .from("room_players")
    .insert({
      player_id: userId,
      room_id: roomData.room_id,
    })
    .select();

  return redirect(`/room/${roomCode}`);
}

export async function fetchPlayersFromRoom(
  roomId: string
): Promise<Tables<"players">[]> {
  try {
    // Fetch room data
    const { data: roomData, error: roomError } = await supabase
      .from("rooms")
      .select("game_id")
      .eq("room_id", roomId)
      .single();

    if (roomError || !roomData) {
      throw new Error("Error fetching room.");
    }

    // Fetch game players
    const { data: gamePlayerData, error: gamePlayerError } = await supabase
      .from("game_players")
      .select("player_id")
      .eq("game_id", roomData.game_id);

    if (gamePlayerError || !gamePlayerData) {
      throw new Error("Error fetching players from room.");
    }
    console.log("gamePlayerData", gamePlayerData);
    // Extract player IDs
    const playerIds = gamePlayerData.map((gp) => gp.player_id);

    // Fetch full player data
    const { data: playersData, error: playersError } = await supabase
      .from("players")
      .select("*")
      .in("player_id", playerIds);

    if (playersError) {
      throw new Error("Error fetching player details.");
    }
    console.log("playersData", playersData);
    return playersData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchGameIdFromRoom(roomId: string) {
  const { data: roomData, error: roomError } = await supabase
    .from("rooms")
    .select("game_id")
    .eq("room_id", roomId)
    .single();

  if (roomError || !roomData) {
    throw new Error("Error fetching room.");
  }

  return roomData.game_id;
}
