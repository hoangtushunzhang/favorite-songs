"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";

export default function EditTicket() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [priority, setPriority] = useState("low");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTicket() {
      const { data } = await supabase
        .from("Songs")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setTitle(data.title ?? "");
        setArtist(data.artist ?? "");
        setPriority(data.priority ?? "low");
      }
    }
    fetchTicket();
  }, [id, supabase]);

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("Songs")
      .update({ title, artist, priority })
      .eq("id", id);

    if (!error) {
      router.refresh();
      router.push("/dashboard");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Ticket</h2>
      <form onSubmit={handleEdit}>
        <label className="block mb-2">
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </label>
        <label className="block mb-2">
          Artist
          <textarea
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </label>
        <label className="block mb-4">
          Priority
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Song"}
        </Button>
      </form>
    </div>
  );
}
