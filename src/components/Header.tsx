"use client";
import { integralCF } from "@/app/fonts/fonts";
import React, { useState, useEffect } from "react";
import scrollLock from "scroll-lock";
import { Search, ChevronDown, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useSearch } from "@/context/ContextProvider";
import { motion } from "framer-motion"; // Correct import

const navLinks = ["Shop", "On Sale", "New Arrivals", "Brands"];

// Optimized animation variants - Simpler and faster
const logoVariant = {
  hidden: { x: -10, opacity: 0 }, // Reduced x distance
  visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }, // Shorter duration and simpler ease
};

const linkVariant = {
  hidden: { y: 10, opacity: 0 }, // Reduced y distance
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.05, duration: 0.2, ease: "easeOut" }, // Shorter delay and duration
  }),
};

const searchVariant = {
  hidden: { y: 10, opacity: 0 }, // Reduced y distance
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.3, duration: 0.2, ease: "easeOut" },
  }, // Shorter delay and duration
};

const cartVariant = {
  hidden: { opacity: 0, scale: 0.9 }, // Start slightly scaled down
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.4, duration: 0.2, ease: "easeOut" },
  }, // Shorter delay and duration
};

const userVariant = {
  hidden: { x: 10, opacity: 0 }, // Reduced x distance
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.5, duration: 0.2, ease: "easeOut" },
  }, // Shorter delay and duration
};

const Header = () => {
  const { cartCount } = useShoppingCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const [click, setClick] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (click) {
      scrollLock.disablePageScroll();
    } else {
      scrollLock.enablePageScroll();
    }
  }, [click]);

  return (
    <header
      className={`w-full lg:h-28 h-20 flex justify-between lg:justify-around items-center py-4 lg:px-10 px-7`}
    >
      <div className="flex relative justify-center items-center gap-x-5">
        <Menu
          onClick={() => setClick(!click)}
          className="lg:hidden cursor-pointer"
        />
        <Link href="/">
          <motion.h1
            className={`${integralCF.className} text-[35px] font-bold tracking-wide cursor-pointer`}
            variants={logoVariant}
            initial="hidden"
            animate="visible"
          >
            SHOP.CO
          </motion.h1>
        </Link>
      </div>
      <motion.ul
        className="hidden lg:flex justify-center items-center gap-x-4 text-sm list-none"
        initial="hidden"
        animate="visible"
      >
        {navLinks.map((item, index) => (
          <motion.li
            key={item}
            variants={linkVariant}
            custom={index}
            className="cursor-pointer"
          >
            {item === "Shop" ? (
              <Link href="/products">{item}</Link>
            ) : (
              <span
                onClick={() =>
                  scrollToSection(item.toLowerCase().replace(" ", ""))
                }
              >
                {item}
              </span>
            )}
          </motion.li>
        ))}
      </motion.ul>
      <motion.div
        className="hidden lg:block relative"
        variants={searchVariant}
        initial="hidden"
        animate="visible"
      >
        <Search className="absolute left-4 top-[13px] text-slate-500 cursor-pointer" />
        <input
          className="w-[600px] h-12 py-3 pl-16 rounded-full font-outfit bg-slate-100 text-slate-400 text-left text-sm"
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>
      <div className="flex justify-center items-center gap-x-4">
        <motion.div
          className="relative"
          variants={cartVariant}
          initial="hidden"
          animate="visible"
        >
          <Link href="/cart">
            <ShoppingCart className="w-5 h-5 cursor-pointer" />
            <div className="bg-black text-white w-4 h-4 text-[8px] flex justify-center items-center rounded-full absolute -right-2 -bottom-1">
              {cartCount}
            </div>
          </Link>
        </motion.div>
        <motion.div variants={userVariant} initial="hidden" animate="visible">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </motion.div>
      </div>
      <motion.div
        className={`${click ? "block w-1/2 top-0 left-0 h-full" : "w-0 -left-10 top-0"} duration-300 absolute bg-slate-100 border-r-2 border-slate-200`}
        initial="hidden"
        animate={click ? "visible" : "hidden"}
      >
        <X
          onClick={() => setClick(!click)}
          className="cursor-pointer mt-8 ml-4"
        />
        <motion.div
          className="flex flex-col justify-center items-center gap-y-10 text-base uppercase list-none mt-36"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } }, // Reduced stagger
            hidden: {},
          }}
        >
          {navLinks.map((item, index) => (
            <motion.div
              key={item}
              variants={linkVariant}
              custom={index}
              className="cursor-pointer"
              onClick={() => {
                if (item !== "Shop")
                  scrollToSection(item.toLowerCase().replace(" ", ""));
                setClick(false);
              }}
            >
              {item === "Shop" ? (
                <Link href="/products" className="flex gap-x-1 items-center">
                  {item} <ChevronDown className="w-4 h-4" />
                </Link>
              ) : (
                item
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;
