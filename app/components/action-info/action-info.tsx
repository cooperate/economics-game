import PrivateAuctionInfo from "./private-auction-info";

const ActionInfo = ({ player }: { player: any }) => {
  // Placeholder content - update with actual logic and data
  return (
    <div className="text-sm text-gray-600 bg-white p-2 rounded">
      <PrivateAuctionInfo showBid={true} bidValue={300} />
    </div>
  );
};

export default ActionInfo;
