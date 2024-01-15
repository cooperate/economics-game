"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { supabaseBrowserClient } from "@/utils/supabase/browser-client";
import { joinRoom } from "app/actions";
import useSupabaseSession from "app/hooks/useSupabaseSession";

const JoinRoom = () => {
  const session = useSupabaseSession();
  const [roomCode, setRoomCode] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if(session) {
      joinRoom(session.user.id, roomCode, displayName)
    } else {
      setLoading(false);
      console.error("No session found");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
        <form onSubmit={handleRoomJoin} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
          <input
            type="text"
            placeholder="Enter Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Joining..." : "Join Room"}
          </button>
          {errorMessage && (
            <p className="text-center text-sm text-red-500">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
