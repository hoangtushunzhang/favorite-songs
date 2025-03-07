"use client";
import React from "react";
import {
  VscArchive,
  VscAccount,
  VscSettingsGear,
  VscHome,
} from "react-icons/vsc";
import RotatingText from "../_components/RotatingText";
import TextPressure from "../_components/TextPressure";
import Particles from "../_components/Particles";
import Dock from "../_components/Dock";

const Hero = () => {
  const items = [
    {
      icon: <VscHome size={18} />,
      label: "Home",
      onClick: () => alert("Home!"),
    },
    {
      icon: <VscArchive size={18} />,
      label: "Love Songs",
      onClick: () => alert("Love Songs!"),
    },
    {
      icon: <VscAccount size={18} />,
      label: "Profile",
      onClick: () => alert("Profile!"),
    },
    {
      icon: <VscSettingsGear size={18} />,
      label: "Settings",
      onClick: () => alert("Settings!"),
    },
  ];
  return (
    <>
      <RotatingText
        texts={["Music", "Is a", "Healing", "Medicine"]}
        mainClassName="px-2 text-3xl font-extrabold sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-3 justify-center rounded-lg"
        staggerFrom={"last"}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-120%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={2000}
      />
      <div
        style={{
          position: "relative",
          height: "100px",
          width: "60%",
          margin: "8px auto",
        }}
      >
        <TextPressure
          text="Hello, Shun's music world!"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="black"
          strokeColor="#ff0000"
          minFontSize={36}
        />
      </div>
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />

    </>
  );
};

export default Hero;
