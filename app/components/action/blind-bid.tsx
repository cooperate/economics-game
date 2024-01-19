import React, { useState } from 'react';

const BlindBid = () => {
  const [bidAmount, setBidAmount] = useState('');

  const handleSubmit = () => {
    // Convert bidAmount to a number and pass it to the onBidSubmit callback
    //onBidSubmit(Number(bidAmount));
    setBidAmount(''); // Reset the bid amount after submitting
  };

  return (
    <div className="m-4 p-4 bg-white border border-gray-300 rounded-lg">
      <input
        type="number"
        value={bidAmount}
        onChange={e => setBidAmount(e.target.value)}
        className="text-gray-700 border-2 border-gray-400 rounded py-2 px-4 mr-2"
        placeholder="Enter bid amount"
      />
      <button
        className="text-gray-700 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
        disabled={!bidAmount}
      >
        Bid
      </button>
    </div>
  );
};

export default BlindBid;
