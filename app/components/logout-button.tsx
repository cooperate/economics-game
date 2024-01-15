"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={signOut}
      className="py-2 px-4 rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
