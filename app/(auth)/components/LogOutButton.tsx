"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const LogOutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/login");
    } else {
      console.log(error);
    }
  };
  return (
    <div>
      <button className="cursor-pointer text-xl" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default LogOutButton;
