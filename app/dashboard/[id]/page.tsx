import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { PageProps, Song } from "@/types";
import { Metadata } from "next";

export const dynamicParams = true;

async function getSong(id: unknown): Promise<Song | null> {
  if (!id || typeof id !== "string" || isNaN(Number(id))) {
    console.error("❌ Invalid song ID:", id);
    return null;
  }

  const songId = Number(id);
  const supabase = createServerComponentClient({ cookies });
  const { data: song, error } = await supabase
    .from("Songs")
    .select("*")
    .eq("id", songId)
    .single();

  if (error || !song) {
    console.error("❌ Error fetching song:", error?.message || "Not found");
    return null;
  }

  return song;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const song = await getSong(params?.id);

  return {
    title: song ? `Love Songs | ${song.title}` : "Song Not Found",
  };
}

export async function generateStaticParams() {
  const supabase = createServerComponentClient({ cookies });
  const { data: songs, error } = await supabase.from("Songs").select("id");

  if (error) {
    console.error(
      "❌ Error fetching songs:",
      error?.message || "No songs found"
    );
    return [];
  }

  return songs?.map((song) => ({ id: song.id.toString() })) || [];
}

export default async function SongDetails({ params }: PageProps) {
  const song = await getSong(params?.id);

  if (!song) {
    notFound();
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
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
        {song.priority} priority
      </div>
      <Link className="mx-20 text-blue-500" href={"/dashboard"}>
        {" "}
        Back to Dashboard
      </Link>
    </div>
  );
}
