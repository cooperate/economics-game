import {
  FaPiggyBank,
  FaClock,
  FaMoneyBillWave,
  FaRegCircle,
} from "react-icons/fa"; // Example using React Icons

const BankInfo = () => {
  // Replace with actual data fetching logic
  const bankBalance = 50000;
  const currentTurn = 5;
  const currentPhase = "Stock Round";
  const currentRound = 2;

  return (
    <div className="bg-white border-2 border-gray-400 p-4 rounded-lg text-gray-700">
      <div className="flex items-center mb-2">
        <FaPiggyBank className="mr-2 text-gray-700" />{" "}
        <span>${bankBalance}</span>
      </div>
      <div className="flex items-center mb-2">
        <FaClock className="mr-2 text-gray-700" />{" "}
        <span>Turn: {currentTurn}</span>
      </div>
      <div className="flex items-center mb-2">
        <FaMoneyBillWave className="mr-2 text-gray-700" />{" "}
        <span>Phase: {currentPhase}</span>
      </div>
      <div className="flex items-center">
        <FaRegCircle className="mr-2 text-gray-700" />{" "}
        <span>Round: {currentRound}</span>
      </div>
    </div>
  );
};

export default BankInfo;
