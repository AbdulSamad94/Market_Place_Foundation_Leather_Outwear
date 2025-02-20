import React from "react";
import Image from "next/image";
import { integralCF } from "@/app/fonts/fonts";

const DressStyles = () => {
  return (
    <section className="mt-20">
      <div className="w-[90%] h-full lg:py-10 py-8 mx-auto rounded-2xl bg-zinc-200/90 ">
        <div className="lg:mb-10 mb-8">
          <h1
            className={`${integralCF.className} text-[40px] font-bold text-center`}
          >
            BROWSE BY dress STYLE
          </h1>
        </div>
        <div className="flex lg:flex-row flex-col justify-center gap-4 items-center mb-4 px-12">
          <div className="lg:w-[400px] lg:h-[270px] w-[300px] h-[190px] relative bg-white rounded-xl overflow-hidden cursor-pointer">
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
          </div>
          <div className="lg:w-[680px] lg:h-[270px] w-[300px] h-[190px] relative bg-white rounded-xl overflow-hidden cursor-pointer">
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
          </div>
        </div>
        <div className="flex lg:flex-row flex-col justify-center gap-4 items-center px-12">
          <div className="lg:w-[680px] lg:h-[270px] w-[300px] h-[190px] relative bg-white rounded-xl overflow-hidden cursor-pointer">
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
          </div>
          <div className="lg:w-[400px] lg:h-[270px] w-[300px] h-[190px] relative bg-white rounded-xl overflow-hidden cursor-pointer">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressStyles;
