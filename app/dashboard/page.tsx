import { Suspense } from "react";
import SongList from "./_components/SongList";
import Link from "next/link";
import GradientText from "../_components/GradientText";

export const metadata = {
  title: "Love Songs | Dashboard",
  description: "Love Songs Dashboard",
};

export default function DashBoard() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <nav className="sticky top-0 z-10 bg-blue-400/80 backdrop-blur-md text-white font-bold py-4 px-6 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Songs</h2>
          <p className="text-sm text-gray-200">Enjoy Music</p>
        </div>
      </nav>
      {/* Song List */}
      <Suspense fallback={<p className="text-center mt-6">Loading...</p>}>
        <SongList />
      </Suspense>
      <div className="fixed bottom-4 right-4 mt-6 flex justify-center">
        <Link className="text-blue-500 hover:underline" href={"/"}>
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
    </main>
  );
}
