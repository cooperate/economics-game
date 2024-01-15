import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AccountWidget from "./components/account-widget";
import { SupabaseClient } from "@supabase/supabase-js";

export default function Home() {
  const cookieStore = cookies();
  let supabase: SupabaseClient;
  const canInitSupabaseClient = async () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      supabase = createClient(cookieStore);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log('session', session);
      if (session) {
        redirect("/dashboard");
      }
      return true;
    } catch (e) {
      return false;
    }
  };

  canInitSupabaseClient();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <AccountWidget />
      </div>
    </div>
  );
}
