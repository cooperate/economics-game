import React from 'react';
import UserDetails from '@/components/user-details';
import BankInfo from '@/components/bank-info';
import DynamicCenter from '@/components/dynamic-center';
import PlayerCircles from '@/components/player-circles';
import Action from '@/components/action';
import { privateCompanies } from 'app/sample-data';

const GamePage = () => {
  return (
    <div className="flex flex-col h-screen">
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
