"use client";
import Link from "next/link";
import { motion } from "motion/react";
import LogOutButton from "../(auth)/components/LogOutButton";

const Header = () => {
  return (
    <header>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-10 "
      >
        <div className="flex items-center justify-between shadow-md px-10 py-4">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              className="font-extrabold text-3xl hover:text-blue-600 transition-all duration-200"
              href={"/"}
            >
              🚀 Favorite Songs
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="flex gap-4">
            <LogOutButton />
            <Link
              className="text-2xl font-extrabold hover:text-blue-600 transition-all duration-200"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
          </motion.div>
        </div>
      </motion.nav>
    </header>
  );
};

export default Header;
