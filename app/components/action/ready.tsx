import React from "react";

const ReadyButton = ({
  onReady,
  playerId,
}: {
  onReady: (playerId: string) => void;
  playerId: string;
}) => {
  return (
    <button
      onClick={() => onReady(playerId)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Ready
    </button>
  );
};

export default ReadyButton;
