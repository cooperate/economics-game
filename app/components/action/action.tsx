"use client";

import React, { useState } from "react";
import BlindBid from "./blind-bid";

const Action = ({ phase, privateCompanies }: any) => {
  if (phase !== "Private Auction") {
    return null; // Or other phase-specific actions
  }

  return (
    <>
      <BlindBid />
    </>
  );
};

export default Action;
