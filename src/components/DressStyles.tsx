"use client";
import React from "react";
import Image from "next/image";
import { integralCF } from "@/app/fonts/fonts";
import { motion } from "framer-motion"; // Import motion

// Animation variants for DressStyles section
const sectionVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const headingVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
  },
};

const styleBoxVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
  },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } }, // Hover animation
};

const DressStyles = () => {
  return (
    <motion.section
      className="mt-20 overflow-hidden" // Added overflow-hidden
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Slightly adjust viewport amount
    >
      <div className="w-[90%] h-full lg:py-10 py-8 mx-auto rounded-2xl bg-zinc-200/90 ">
        <motion.div className="lg:mb-10 mb-8" variants={headingVariant}>
          <h1
            className={`${integralCF.className} text-[40px] font-bold text-center`}
          >
            BROWSE BY dress STYLE
          </h1>
        </motion.div>
        <div className="flex lg:flex-row flex-col justify-center gap-4 items-center mb-4 px-12">
          <motion.div
            className="lg:w-[400px] lg:h-[270px] w-[300px] h-[190px] relative bg-white rounded-xl overflow-hidden cursor-pointer"
            variants={styleBoxVariant}
            whileHover="hover"
          >
            <p className="text-[28px] font-bold absolute top-6 left-7 z-10">
              Casual
            </p>
            <Image
              src="/dressStyle/image1.png"
              alt="img-1"
              width={310}
              height={219}
              className="w-[310px] h-full absolute right-0"
            />
          </motion.div>
          <motion.div
            className="lg:w-[680px] lg:h-[270px] w-[300px] h-[190px] relative bg-white rounded-xl overflow-hidden cursor-pointer"
            variants={styleBoxVariant}
            whileHover="hover"
          >
            <p className="text-[28px] font-bold absolute top-6 left-7 z-10">
              Formal
            </p>
            <Image
              src="/dressStyle/image4.png"
              alt="img-1"
              className="w-full h-auto object-cover"
              priority
              fill
            />
          </motion.div>
        </div>
        <div className="flex lg:flex-row flex-col justify-center gap-4 items-center px-12">
          <motion.div
            className="lg:w-[680px] lg:h-[270px] w-[300px] h-[190px] relative bg-white rounded-xl overflow-hidden cursor-pointer"
            variants={styleBoxVariant}
            whileHover="hover"
          >
            <p className="text-[28px] font-bold absolute top-6 left-7 z-10">
              Party
            </p>
            <Image
              src="/dressStyle/image3.png"
              alt="img-1"
              priority
              fill
              className="w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div
            className="lg:w-[400px] lg:h-[270px] w-[300px] h-[190px] relative bg-white rounded-xl overflow-hidden cursor-pointer"
            variants={styleBoxVariant}
            whileHover="hover"
          >
            <p className="text-[28px] font-bold absolute top-6 left-7 z-10">
              Gym
            </p>
            <Image
              src="/dressStyle/image2.png"
              alt="img-1"
              width={310}
              height={219}
              className="w-[310px] h-full absolute right-0"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default DressStyles;
