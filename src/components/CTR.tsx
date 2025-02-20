import React from "react";
import { Mail } from "lucide-react";
import { integralCF } from "@/app/fonts/fonts";

const CTR = () => {
  return (
    <section className="mt-20 lg:px-10 px-2">
      <div className="bg-black w-full lg:h-56 h-auto rounded-3xl flex md:flex-row flex-col justify-between px-5 md:px-14 py-10 md:py-0 gap-y-10 md:gap-y-0 items-center">
        <h1
          className={`${integralCF.className} text-white text-3xl leading-none md:text-[42px] font-bold md:w-1/2 w-full`}
        >
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h1>
        <div className="flex justify-end flex-col gap-y-3 w-full lg:w-auto">
          <div className="relative">
            <Mail className="absolute top-[11px] left-4 text-slate-500 font-bold w-5 h-5" />
            <input
              className="rounded-full md:w-[320px] w-full h-10 py-1 pl-14 text-sm outline-none"
              type="text"
              placeholder="Enter your email adress"
            />
          </div>
          <button className="bg-white text-black hover:bg-slate-100 duration-200 hover:scale-105 font-medium rounded-full md:w-[320px] w-full h-10 py-1 lg:px-10 px-2 text-sm">
            Subscribe to Newslater
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTR;
