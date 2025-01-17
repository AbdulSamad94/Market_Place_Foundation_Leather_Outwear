"use client";
import React, { useState, useEffect } from "react";
import scrollLock from "scroll-lock";
import {
  Search,
  ChevronDown,
  ShoppingCart,
  CircleUserRound,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";

const Header = () => {
  const { cartCount } = useShoppingCart();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [click, setClick] = useState(false);

  function handleClick() {
    setClick(!click);
  }

  useEffect(() => {
    if (click) {
      scrollLock.disablePageScroll();
    } else {
      scrollLock.enablePageScroll();
    }
  }, [click]);

  return (
    <header className="w-full lg:h-28 h-20 flex justify-between lg:justify-around items-center py-4 lg:px-10 px-7">
      <div className="flex relative justify-center items-center gap-x-5">
        <Menu onClick={handleClick} className="lg:hidden cursor-pointer" />
        <Link href="/">
          <h1 className="text-[35px] font-bold tracking-wide cursor-pointer">
            SHOP.CO
          </h1>
        </Link>
      </div>
      <div className="hidden lg:flex justify-center items-center gap-x-4 text-sm list-none">
        <Link
          href="/products"
          className="flex gap-x-1 justify-center items-center cursor-pointer"
        >
          Shop <ChevronDown className="w-4 h-4 cursor-pointer" />
        </Link>
        <li
          onClick={() => scrollToSection("onsale")}
          className="cursor-pointer"
        >
          On Sale
        </li>
        <li
          onClick={() => scrollToSection("onsale")}
          className="cursor-pointer"
        >
          New Arrivals
        </li>
        <li
          onClick={() => scrollToSection("brands")}
          className="cursor-pointer"
        >
          Brands
        </li>
      </div>
      <div className="hidden lg:block relative">
        <Search className="absolute left-4 top-[13px] text-slate-500 cursor-pointer" />
        <input
          className="w-[600px] h-12 py-3 pl-16 rounded-full font-outfit cursor-pointer bg-slate-100 text-slate-400 text-left text-sm"
          type="text"
          placeholder="Search for products..."
        />
      </div>
      <div className="flex justify-center items-center gap-x-4">
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          <div className="bg-black text-white w-4 h-4 text-[8px] flex justify-center items-center rounded-full absolute -right-2 -bottom-1">
            {cartCount}
          </div>
        </Link>
        <div>
          <CircleUserRound className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
      <div
        className={`${
          click ? "block w-1/2 top-0 left-0 h-full" : "w-0 -left-10 top-0"
        } duration-300 absolute bg-slate-100 border-r-2  border-slate-200`}
      >
        <X onClick={handleClick} className="cursor-pointer mt-8 ml-4" />
        <div className="flex flex-col justify-center items-center gap-y-10 text-base uppercase list-none mt-36">
          <Link
            href="/products"
            onClick={() => {
              scrollToSection("shop");
              setClick(false);
            }}
            className="flex gap-x-1 justify-center items-center cursor-pointer"
          >
            Shop <ChevronDown className="w-4 h-4 cursor-pointer" />
          </Link>
          <li
            onClick={() => {
              scrollToSection("onsale");
              setClick(false);
            }}
            className="cursor-pointer"
          >
            On Sale
          </li>
          <li
            onClick={() => {
              scrollToSection("onsale");
              setClick(false);
            }}
            className="cursor-pointer"
          >
            New Arrivals
          </li>
          <li
            onClick={() => {
              scrollToSection("brands");
              setClick(false);
            }}
            className="cursor-pointer"
          >
            Brands
          </li>
        </div>
      </div>
    </header>
  );
};

export default Header;
