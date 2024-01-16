"use client";

import React, { useState } from "react";
import Share from "./share"; // Make sure the path is correct
import { FaWallet, FaBalanceScale } from "react-icons/fa"; // Import icons

const PlayerCard = ({ player }: { player: any }) => {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const togglePortfolio = () => setShowPortfolio(!showPortfolio);

  return (
    <div
      className={`cursor-pointer mx-2 flex flex-col items-center justify-start bg-white border-2 border-gray-400 w-36 rounded text-gray-700 transition-all duration-300 ${
        showPortfolio ? "mb-2" : "h-12"
      }`}
      onClick={togglePortfolio}
    >
      <div className="text-xs font-medium truncate w-full text-center">
        {player.name}
      </div>
      <div className="flex items-center text-xs font-medium">
        <FaWallet className="text-green-600" />
        <span className="mx-1">${player.cashOnHand}</span>
        <FaBalanceScale className="text-blue-600" />
        <span className="ml-1">${player.totalAssets}</span>
      </div>
      {showPortfolio && (
        <div className="w-full pt-2">
          {player.shares.map((share: any, index: any) => (
            <Share key={index} share={share} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
