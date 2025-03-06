import React from "react";
import RotatingText from "./RotatingText";

const Hero = () => {
  return (
    <div>
      <RotatingText
        texts={["Music", "Is a", "Healing", "Medicine"]}
        mainClassName="px-2 text-3xl font-extrabold sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-3 justify-center rounded-lg"
        staggerFrom={"last"}
        initial={{ y: "100%",  opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-120%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={2000}
      />
    </div>
  );
};

export default Hero;
