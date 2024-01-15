import Link from "next/link";
import AuthButton from "./auth-button";

const Header = () => {
  return (
    <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/dashboard"><h1 className="text-2xl font-bold text-indigo-600">Economic Game</h1></Link>
      <AuthButton />
    </div>
  );
};

export default Header;
