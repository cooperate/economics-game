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

export async function markPlayerAsReady(gamePhaseId: string, playerId: string) {
  // Fetch the current state of ready_players for the game phase
  const { data, error } = await supabase
    .from('game_phases')
    .select('ready_players')
    .eq('phase_id', gamePhaseId)
    .single();

  if (error) {
    console.error('Error fetching ready players:', error);
    return;
  }

  // Update the ready_players JSON
  const updatedReadyPlayers = {
    ...data.ready_players,
    [playerId]: true
  };

  // Update the database
  const { error: updateError } = await supabase
    .from('game_phases')
    .update({ ready_players: updatedReadyPlayers })
    .eq('phase_id', gamePhaseId);

  if (updateError) {
    console.error('Error updating ready players:', updateError);
  }
};

export async function checkAllPlayersReady(gameId: string, phaseId: string) {
  // Fetch the number of players in the game
  const { data: playerData, error: playerError } = await supabase
    .from('game_players')
    .select('player_id', { count: 'exact' })
    .eq('game_id', gameId);

  if (playerError) {
    console.error('Error fetching player count:', playerError);
    return;
  }

  // Fetch the ready players from the game phase
  const { data: phaseData, error: phaseError } = await supabase
    .from('game_phases')
    .select('ready_players')
    .eq('phase_id', phaseId)
    .single();

  if (phaseError) {
    console.error('Error fetching game phase:', phaseError);
    return;
  }

  const playerCount = playerData.length;
  const readyPlayerCount = Object.keys(phaseData.ready_players || {}).length;

  // Check if all players are ready
  if (playerCount === readyPlayerCount) {
    advancePhase(gameId, phaseId);
  }
};


export async function advancePhase(gameId: string, phase: any) {
  
};