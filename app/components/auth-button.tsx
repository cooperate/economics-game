import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "./logout-button";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <span className="text-gray-700">Hey, {user.email}!</span>
      <LogoutButton />
    </div>
  ) : (
    <Link className="py-2 px-3 rounded-md text-white bg-indigo-500 hover:bg-indigo-600" href="/">
        Login
    </Link>
  );
}
