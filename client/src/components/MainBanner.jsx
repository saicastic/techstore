import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { assets } from "../assets/assets";

export default function MainBanner() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-100 to-white overflow-hidden flex items-center justify-center p-6">
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <img
          src={assets.home_banner}
          alt="Tech store background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-4xl text-center space-y-6">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Discover the Future of Tech
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Explore the latest gadgets, gear, and electronics at unbeatable
          prices.
        </motion.p>

        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <button className="text-lg px-6 py-3 rounded-2xl shadow-lg bg-blue-600 text-white flex items-center hover:bg-blue-700 transition">
            Shop Now
            <ShoppingCart className="ml-2" />
          </button>
        </motion.div>
      </div>

      <motion.img
        src={assets.cpu_image}
        alt="Gadget showcase"
        className="hidden md:block absolute bottom-0 right-0 w-64 rounded-tl-2xl shadow-2xl"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      />
    </section>
  );
}
