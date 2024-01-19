import React from 'react';

const PrivateAuctionInfo = ({ showBid, bidValue }: {showBid: boolean, bidValue: number}) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-2 m-2 text-gray-700">
      {showBid ? (
        <div className="text-center">
          <p className="text-sm">Bid Amount:</p>
          <p className="text-lg font-bold">${bidValue}</p>
        </div>
      ) : (
        <p className="text-center text-sm">Writing Bid...</p>
      )}
    </div>
  );
};

export default PrivateAuctionInfo;
