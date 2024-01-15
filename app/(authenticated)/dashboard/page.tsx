import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <div className="space-y-4">
        <Link
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          href="/create-room"
        >
          Create a Room
        </Link>
        <Link
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
          href="/join-room"
        >
          Join a Room
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
