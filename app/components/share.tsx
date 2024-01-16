const Share = ({ share }: { share: any }) => {
  const totalValue = share.quantity * share.value;
  return (
    <div className="flex items-center mb-2">
      <div className="w-10 h-10 flex items-center justify-center bg-blue-500 border-2 border-blue-700 text-white rounded-full mr-2 px-1">
        {share.company}
      </div>
      <span className="font-semibold mr-1">x{share.quantity}</span>
      <span className="text-green-600 font-semibold">@ ${share.value}</span>
      <span className="ml-2 text-gray-600">({totalValue})</span>
    </div>
  );
};

export default Share;
