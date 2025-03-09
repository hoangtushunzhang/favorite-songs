"use client";

import { useRouter, useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";

export default function DeleteSong() {
  const { id } = useParams();
  const supabase = createClientComponentClient();
  const router = useRouter();

  async function handleDelete() {
    const songId = Number(id); 
  if (isNaN(songId)) {
    console.error("Invalid song ID:", id);
    return;
  }

  const { error } = await supabase.from("Songs").delete().eq("id", songId);

    if (error) {
      console.error("Failed to delete song:", error);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-red-600">Are you sure?</h2>
      <p>This action cannot be undone.</p>

      <div className="mt-6 flex justify-between">
        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-400 hover:bg-gray-500"
        >
          Cancel
        </Button>
        <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
          Delete
        </Button>
      </div>
    </div>
  );
}
