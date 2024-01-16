import { FaWallet, FaBalanceScale } from 'react-icons/fa'; // Import icons
import Share from "./share";

const UserDetails = () => {
  // Replace with actual data fetching logic
  const displayName = "Player Name";
  const cashOnHand = 1000;
  const shareOwnerships = [
    { company: "SNK", quantity: 5, value: 20 },
    // Add more companies as needed
  ];

  // Calculate total value of all shares
  const totalShareValue = shareOwnerships.reduce(
    (acc, share) => acc + share.quantity * share.value,
    0
  );

  // Calculate total asset value
  const totalAssets = cashOnHand + totalShareValue;

  return (
    <div className="bg-white border-2 border-gray-400 p-4 rounded-lg text-gray-700">
      <p className="mb-2 font-bold">{displayName}</p>
      <div className="flex items-center mb-4">
        <FaWallet className="mr-2 text-green-600" />
        <span>Cash on Hand: <span className="font-semibold">${cashOnHand}</span></span>
      </div>
      <div>
        {shareOwnerships.map((share, index) => (
          <Share key={index} share={share} />
        ))}
      </div>
      <div className="flex items-center mt-4">
        <FaBalanceScale className="mr-2 text-blue-600" />
        <span>Total Asset Value: <span className="font-semibold">${totalAssets}</span></span>
      </div>
    </div>
  );
};

export default UserDetails;
