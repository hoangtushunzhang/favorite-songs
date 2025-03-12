"use client";
import AnimatedList from "@/app/_components/AnimatedList";
import { Song } from "@/types";

export default function SongList({ songs }: { songs: Song[] }) {
  return (
    <AnimatedList
      items={songs.map((song) => `${song.title} - ${song.artist}`)}
      onItemSelect={(item, index) => console.log("Selected:", item, index)}
      showGradients={true}
      enableArrowNavigation={true}
      displayScrollbar={true}
    />
  );
}
