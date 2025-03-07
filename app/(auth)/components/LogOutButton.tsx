"use client";

import ShinyText from "@/app/_components/ShinyText";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const LogOutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/login");
    } else {
      console.log(error);
    }
  };
  
  return (
    <div>
      <button
        className="cursor-pointer text-md bg-black/90 px-3 py-1 rounded-full  "
        onClick={handleLogout}
      >
        <ShinyText
          text="Log out"
          disabled={false}
          speed={3}
          className="custom-class"
        />
      </button>
    </div>
  );
};

export default LogOutButton;
