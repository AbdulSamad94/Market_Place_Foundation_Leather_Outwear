import Image from "next/image";
import { Star, StarHalf } from "lucide-react";
import { Product } from "@/types/products";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";

interface CustomOffersProps {
  styling: string;
  text: string;
  arrivalData: Product[];
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
      <div className=" lg:mx-8">
        <Swiper
          slidesPerView={1}
          breakpoints={{
            680: { slidesPerView: 2 },
            930: { slidesPerView: 2 },
            1300: { slidesPerView: 4 },
          }}
          loop={true}
          modules={[Navigation, Pagination, A11y]}
          className="flex justify-center md:flex-row flex-col md:gap-y-0 gap-y-12 items-center mt-14 mx-auto w-full"
        >
          {arrivalData.map((items, index) => (
            <SwiperSlide className="mx-auto" key={index}>
              <Link
                href={`/products/${items.slug.current}`}
                className="cursor-pointer"
              >
                <Image
                  src={items.imageUrl}
                  alt="brand-img"
                  width={295}
                  height={270}
                  className={`${
                    items.imageUrl === "$240" ? "h-[298px]" : "h-[298px]"
                  } rounded-3xl w-[295px] `}
                />
                <div className="text-lg font-bold mt-3">{items.name}</div>
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
                    <h1 className="font-bold text-xl">${items.price}</h1>
                    <h1 className="font-bold text-zinc-500 text-xl line-through ">
                      ${items.price - 40}
                    </h1>
                    <p
                      className={`${
                        items.discountPercent > 0
                          ? "text-[10px] text-orange-600 font-semibold text-center rounded-full w-12 h-6 py-1 px-4 flex justify-center items-center bg-orange-100"
                          : "hidden"
                      } `}
                    >
                      {items.discountPercent}%
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
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
