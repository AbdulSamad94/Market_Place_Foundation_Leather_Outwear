"use client";
import React from "react";
import Image from "next/image";
import CountUp from "react-countup";
import Link from "next/link";

const data = [
  {
    number: 200,
    text: "International Brands",
  },
  {
    number: 2000,
    text: "High-Quality Products",
  },
  {
    number: 30000,
    text: "Happy Customers",
  },
];
const Hero = () => {
  return (
    <section className="w-full h-full bg-zinc-100 pt-8 md:pt-20">
      <div className="flex lg:justify-between flex-col lg:flex-row items-center">
        <div className="md:w-2/5 px-3 md:ml-10 md:px-0 flex flex-col">
          <h1 className="uppercase text-4xl md:text-5xl w-full text-left font-bold mb-4 md:mb-8">
            find clothes that matches your styles
          </h1>
          <p className="text-zinc-500 text-[16px] mb-5 md:mb-8">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link
            href="/products"
            className="bg-black text-white py-3 px-5 w-full md:w-48 h-12 rounded-full flex items-center justify-center mb-12"
          >
            Shop Now
          </Link>
          <div className="flex gap-10 mb-20 flex-wrap justify-center md:justify-normal">
            {data.map((item, index) => (
              <div key={index}>
                <div className="text-4xl te font-bold mb-2">
                  <CountUp end={item.number} duration={3} />
                  {"+"}
                </div>
                <div className="text-sm md:text-[16px] text-zinc-500 ">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
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
            className="lg:w-[560px] lg:h-[560px] w-[400px] h-[400px] "
          />
        </div>
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
