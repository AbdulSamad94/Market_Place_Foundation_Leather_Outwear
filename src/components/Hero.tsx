"use client";
import React from "react";
import Image from "next/image";
import CountUp from "react-countup";
import Link from "next/link";
import { motion } from "framer-motion";
import { integralCF } from "@/app/fonts/fonts";

// Refined Animation Variants with simplified easing (easeInOut)
const textVariant = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeInOut" }, // Using "easeInOut" string
  },
};

const paragraphVariant = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut", delay: 0.2 }, // Using "easeInOut" string
  },
};

const imageVariant = {
  hidden: { x: 120, opacity: 0, scale: 0.9 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: "easeInOut" }, // Using "easeInOut" string
  },
};

const buttonVariant = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.5, duration: 0.6, ease: "easeInOut" }, // Using "easeInOut" string
  },
};

const counterVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: "easeInOut" }, // Using "easeInOut" string
  }),
};

const Hero = () => {
  const data = [
    { number: 200, text: "International Brands" },
    { number: 2000, text: "High-Quality Products" },
    { number: 30000, text: "Happy Customers" },
  ];

  return (
    <section className="w-full h-full bg-zinc-100 pt-8 md:pt-20 overflow-hidden">
      <div className="flex lg:justify-between flex-col lg:flex-row items-center">
        <motion.div className="md:w-2/5 px-3 md:ml-10 md:px-0 flex flex-col">
          <motion.h1
            className={`${integralCF.className} uppercase text-4xl md:text-6xl w-full text-left font-bold mb-4 md:mb-8`}
            variants={textVariant}
            initial="hidden"
            animate="visible"
          >
            find clothes that matches your styles
          </motion.h1>
          <motion.p
            className="text-zinc-500 text-[16px] mb-5 md:mb-8"
            variants={paragraphVariant}
            initial="hidden"
            animate="visible"
          >
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </motion.p>
          <motion.div
            variants={buttonVariant}
            initial="hidden"
            animate="visible"
          >
            <Link
              href="/products"
              className="bg-black hover:bg-slate-900 duration-300 hover:scale-110 text-white py-3 px-5 w-full md:w-48 h-12 rounded-full flex items-center justify-center mb-12"
            >
              Shop Now
            </Link>
          </motion.div>
          <motion.div
            className="flex gap-10 mb-20 flex-wrap justify-center md:justify-normal"
            initial="hidden"
            animate="visible"
          >
            {data.map((item, index) => (
              <motion.div key={index} variants={counterVariant} custom={index}>
                <div className="text-4xl font-bold mb-2">
                  <CountUp end={item.number} duration={2} />+
                </div>
                <div className="text-sm md:text-[16px] text-zinc-500">
                  {item.text}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="relative"
          variants={imageVariant}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/hero/Vector.png"
            alt="star"
            width={80}
            height={80}
            className="absolute md:-left-20 top-1/4"
          />
          <Image
            src="/hero/Vector.png"
            width={56}
            height={56}
            alt="star"
            className="absolute right-5 top-10"
          />
          <Image
            src="/hero/hero-img.png"
            width={560}
            height={560}
            alt="hero-bg"
            className="lg:w-[560px] lg:h-[560px] w-[400px] h-[400px]"
          />
        </motion.div>
      </div>
      <div className="w-full bg-black h-32 md:h-20 mb-10 flex justify-center md:justify-around items-center gap-x-5 flex-wrap">
        <Image
          src="/hero/one-text.png"
          alt="text-logo"
          width={130}
          height={130}
        />
        <Image
          src="/hero/two-text.png"
          alt="text-logo"
          width={70}
          height={70}
        />
        <Image
          src="/hero/three-text.png"
          alt="text-logo"
          width={130}
          height={130}
        />
        <Image
          src="/hero/fourth-text.png"
          alt="text-logo"
          width={130}
          height={130}
        />
        <Image
          src="/hero/fifth-text.png"
          alt="text-logo"
          width={130}
          height={130}
        />
      </div>
    </section>
  );
};

export default Hero;
