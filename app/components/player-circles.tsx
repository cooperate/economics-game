import ActionInfo from "./action-info/action-info";
import PlayerCard from "./player-card";

const PlayerCircles = () => {
  // Replace with actual player data
  const players = [
    {
      id: 1,
      name: "Player 1",
      cashOnHand: 1000,
      totalAssets: 5000,
      shares: [
        { company: "SNK", quantity: 5, value: 20 },
        { company: "XYZ", quantity: 10, value: 15 },
        // Add more shares as needed
      ],
    },
    {
      id: 2,
      name: "Player 2",
      cashOnHand: 1500,
      totalAssets: 5500,
      shares: [
        { company: "ABC", quantity: 8, value: 22 },
        { company: "DEF", quantity: 6, value: 18 },
        // Add more shares as needed
      ],
    },
    // Add more players as needed
  ];

  return (
    <div className="flex flex-col items-center justify-end h-screen">
      <div className="flex justify-center items-center h-16 bg-gray-100 border-t-4 border-gray-300">
        {players.map((player) => (
          <div key={player.id}>
            <ActionInfo player={player} />
            <PlayerCard player={player} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerCircles;
