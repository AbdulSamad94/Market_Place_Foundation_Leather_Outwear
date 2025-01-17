import React from "react";
import Image from "next/image";
import { Star, StarHalf } from "lucide-react";
import { ArrivalItem } from "./TypeSafety";

interface CustomOffersProps {
  styling: string;
  text: string;
  arrivalData: ArrivalItem[];
}

const CustomOffers: React.FC<CustomOffersProps> = ({
  styling,
  text,
  arrivalData,
}) => {
  return (
    <section>
      <div>
        <h1
          className={`${styling} py-4 text-[40px] font-bold text-center mx-auto`}
        >
          {text}
        </h1>
      </div>
      <div className="flex justify-center md:flex-row flex-col md:gap-y-0  gap-y-12 items-center gap-x-2 mt-14">
        {arrivalData.map((items, index) => (
          <div key={index}>
            <div className="cursor-pointer">
              <Image
                src={items.image}
                alt="brand-img"
                width={295}
                height={270}
                className={`${
                  items.image === "$240" ? "h-[298px]" : "h-[298px]"
                } rounded-3xl w-[295px] `}
              />
              <div className="text-lg font-bold mt-3">{items.text}</div>
              <div className="flex items-center mb-1 gap-x-1">
                <div className="flex gap-x-1">
                  <Star className="w-4 text-yellow-400 fill-current" />
                  <Star className="w-4 text-yellow-400 fill-current" />
                  <Star className="w-4 text-yellow-400 fill-current" />
                  <Star className="w-4 text-yellow-400 fill-current" />
                  <StarHalf className="w-4 text-yellow-400 fill-current" />
                </div>
                <p className="text-xs justify-center items-center font-semibold">
                  4.5/<span className="text-zinc-500">5</span>{" "}
                </p>
              </div>
              <div>
                <div className="flex gap-x-3 items-center">
                  <h1 className="font-bold text-xl">{items.price}</h1>
                  <h1 className="font-bold text-zinc-500 text-xl line-through ">
                    {items.prevPrice}
                  </h1>
                  <p
                    className={`${
                      items.badge
                        ? "text-[10px] text-orange-600 font-semibold text-center rounded-full w-12 h-6 py-1 px-4 flex justify-center items-center bg-orange-100"
                        : ""
                    } `}
                  >
                    {items.badge}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="border border-slate-300 px-8 py-3 text-base w-56 rounded-full font-semibold text-center">
          View All
        </button>
      </div>
    </section>
  );
};

export default CustomOffers;
