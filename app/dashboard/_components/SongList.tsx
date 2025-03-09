"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Song {
  id: number;
  title: string;
  artist: string;
  priority: string;
}

export default function SongList() {
  const supabase = createClientComponentClient();

  const [songs, setSongs] = useState<Song[]>([]);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    async function fetchSongs() {
      const { data: songs, error } = await supabase.from("Songs").select("*");
      if (error) {
        console.error("Eror fetching songs:", error);
      } else {
        setSongs(songs || []);
      }
    }
    fetchSongs();
  }, [supabase]);

  const filteredSongs = songs.filter((song) => {
    const matchesSearch = song.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPriority = priorityFilter
      ? song.priority === priorityFilter
      : true;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Favorite Songs List
        </h2>
        <Link href="/dashboard/create">
          <Button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all">
            + Create
          </Button>
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Song List */}
      {filteredSongs.length > 0 ? (
        <div className="grid gap-4">
          {filteredSongs.map((song) => (
            <div
              key={song.id}
              className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Song details */}
              <Link href={`/dashboard/${song.id}`} className="block">
                <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  {song.title}
                </h3>
                <p className="text-gray-600 mt-2">{song.artist}</p>

                <span
                  className={`inline-block mt-3 px-3 py-1 text-sm font-semibold text-white rounded-md ${
                    song.priority === "high"
                      ? "bg-red-500"
                      : song.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                   {song.priority.charAt(0).toUpperCase() + song.priority.slice(1)} Priority
                </span>
              </Link>

              {/* Action button */}
              <div className="flex justify-end gap-2 mt-4">
                <Link href={`/dashboard/edit/${song.id}`}>
                  <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                    Edit
                  </Button>
                </Link>
                <Link href={`/dashboard/delete/${song.id}`}>
                  <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                    Delete
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No songs found.</p>
      )}
    </div>
  );
}
