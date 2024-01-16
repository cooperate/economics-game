"use client";

import React, { useState } from "react";

const Action = ({ phase, privateCompanies }: any) => {
  if (phase !== "Private Auction") {
    return null; // Or other phase-specific actions
  }

  return (
    <div className="m-4 p-4 bg-white border border-gray-300 rounded-lg">
      <button
        className="text-gray-700 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {}}
      >
        Bid ($300)
      </button>
    </div>
  );
};

export default Action;
