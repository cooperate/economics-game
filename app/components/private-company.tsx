import {
  FaTruck,
  FaIndustry,
  FaBroadcastTower,
  FaShip,
  FaWind,
} from "react-icons/fa"; // Example using React Icons

// Function to get the icon based on the industry
const getIndustryIcon = (industry: string) => {
  switch (industry) {
    case "Transportation":
      return <FaTruck />;
    case "Manufacturing":
      return <FaIndustry />;
    case "Communications":
      return <FaBroadcastTower />;
    case "Logistics":
      return <FaShip />;
    case "Energy":
      return <FaWind />;
    default:
      return <FaIndustry />;
  }
};

const PrivateCompany = ({ privateCompany }: { privateCompany: any }) => {
  // Check if the company is active
  const isActive = privateCompany.isActive;

  return (
    <div
      className={`relative ${
        isActive ? "bg-green-100 border-2 border-green-500" : "bg-white border-2 border-gray-400"
      } rounded-lg p-4 m-2 text-gray-700 w-64`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{privateCompany.name}</h3>
        <div className="text-lg text-gray-500">
          {getIndustryIcon(privateCompany.industry)}
        </div>
      </div>
      <div className="flex justify-between items-center text-sm mb-1">
        <span>Base Price: ${privateCompany.basePrice}</span>
        <span>Revenue: ${privateCompany.revenue}</span>
      </div>
      <p className="text-sm">Ability: {privateCompany.ability}</p>
    </div>
  );
};

export default PrivateCompany;
