import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Aurora from "../_components/Aurora";
import SongList from "./_components/SongList";
import { Song } from "@/types";
import Orb from "../_components/Orb";
import GradientText from "../_components/GradientText";
import Link from "next/link";

async function getSongs(): Promise<Song[]> {
  const supabase = createServerComponentClient({ cookies });
  const { data: songs, error } = await supabase
    .from("Songs")
    .select("id, title, artist, priority");

  if (error) {
    console.error("Error fetching songs:", error.message);
    return [];
  }

  return songs || [];
}

export default async function SongsPage() {
  const songs = await getSongs();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="fixed inset-0 -z-20 opacity-60">
        <Aurora
          colorStops={["#A0E6FF", "#DE6CFF", "#2C487F"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl gap-8">
        <div className="w-full lg:w-2/3 p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-black">Song List</h1>

          {songs.length > 0 ? (
            <SongList songs={songs} />
          ) : (
            <p className="text-white">No songs available.</p>
          )}
        </div>
        <div
          style={{
            width: "100%",
            height: "600px",
            position: "relative",
            marginLeft: "60px",
          }}
        >
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
        </div>
      </div>
      <Link href="/">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={true}
          className="custom-class p-3"
        >
          Back to Home Page
        </GradientText>
      </Link>
    </div>
  );
}
