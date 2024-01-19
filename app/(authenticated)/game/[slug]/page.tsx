'use client';

import React, { useEffect, useState } from 'react';
import UserDetails from '@/components/user-details';
import BankInfo from '@/components/bank-info';
import DynamicCenter from '@/components/dynamic-center';
import PlayerCircles from '@/components/player-circles';
import Action from '@/components/action';
import { privateCompanies } from 'app/sample-data';
import useGameEvents from '@/hooks/useGameEvents';

const GamePage = ({ params }: { params: { slug: string } }) => {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { listen } = useGameEvents();

  useEffect(() => {
    const gameId = params.slug; // Replace with actual game ID
    const unsubscribe = listen(gameId, (event) => {
      setToastMessage(`Event: ${event.event_type}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
    });

    return () => unsubscribe();
  }, [listen]);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-start p-4">
        <UserDetails />
        <Action phase={"Private Auction"} privateCompanies={privateCompanies} />
        <BankInfo />
      </div>
      <div className="flex-grow">
        <DynamicCenter />
      </div>
      <div className="p-4">
        <PlayerCircles />
      </div>
    </div>
  );
};

export default GamePage;
