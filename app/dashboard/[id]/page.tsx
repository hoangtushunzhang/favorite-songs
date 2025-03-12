import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { Song } from "@/types";
import GradientText from "@/app/_components/GradientText";

async function getSong(id: string): Promise<Song | null> {
  const songId = Number(id);
  if (isNaN(songId)) {
    console.error("Invalid song ID:", id);
    return null;
  }

  const supabase = createServerComponentClient({ cookies });
  const { data: song, error } = await supabase
    .from("Songs")
    .select("*")
    .eq("id", songId)
    .single();

  if (error || !song) {
    console.error("Error fetching song:", error?.message || "Not found");
    return null;
  }

  return song;
}

export default async function SongDetails({
  params,
}: {
  params: { id: string };
}) {
  const song = await getSong(params.id);

  if (!song) {
    notFound();
  }

  return (
    <div className="relative max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-900">{song.title}</h2>
      <p className="text-sm text-gray-500 mt-1">{song.artist}</p>

      <div
        className={`inline-block px-3 py-1 mt-4 rounded-full text-white text-sm font-semibold ${
          song.priority === "high"
            ? "bg-red-500"
            : song.priority === "medium"
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
      >
        {song.priority.charAt(0).toUpperCase() + song.priority.slice(1)}{" "}
        Priority
      </div>
      <Link className="m-4 absolute bottom-0 right-0" href="/dashboard">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={true}
          className="custom-class p-2"
        >
          Back to Dashboard
        </GradientText>
      </Link>
    </div>
  );
}
