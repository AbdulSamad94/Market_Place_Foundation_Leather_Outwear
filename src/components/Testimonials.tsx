"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRight, ArrowLeft, Star, CircleCheck } from "lucide-react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import type { Swiper as SwiperType } from "swiper";
import { integralCF } from "@/app/fonts/fonts";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface Testimonial {
  name: string;
  text: string;
}

const testimonialData: Testimonial[] = [
  {
    name: "Sarah M.",
    text: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`,
  },
  {
    name: "Alex K.",
    text: `"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."`,
  },
  {
    name: "James L.",
    text: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."`,
  },
  {
    name: "Mooen J.",
    text: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`,
  },
  {
    name: "Joseph A.",
    text: `"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."`,
  },
];

const Testimonials: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const updateBlurEffect = () => {
      if (swiperRef.current) {
        const slides = swiperRef.current.slides;
        const activeIndex = swiperRef.current.activeIndex;

        // Calculate the center slide index for different `slidesPerView` configurations
        const slidesPerView = swiperRef.current.params.slidesPerView as number;
        const centerIndex = activeIndex + Math.floor(slidesPerView / 2);

        slides.forEach((slide, index) => {
          const slideElement = slide as HTMLElement;

          if (index === centerIndex) {
            gsap.to(slideElement, { filter: "blur(0px)", duration: 0.5 });
          } else {
            gsap.to(slideElement, { filter: "blur(3px)", duration: 0.5 });
          }
        });
      }
    };

    if (swiperRef.current) {
      // Initialize blur effect on load
      updateBlurEffect();

      // Update blur effect on slide change
      swiperRef.current.on("slideChange", updateBlurEffect);
    }

    return () => {
      swiperRef.current?.off("slideChange", updateBlurEffect);
    };
  }, []);

  return (
    <section className="mx-auto">
      <div className="mt-20 lg:px-14 px-5 flex justify-between">
        <h1
          className={`${integralCF.className} lg:text-[38px] text-[32px] font-bold text-left uppercase md:leading-4 leading-none`}
        >
          Our happy customers
        </h1>
        <div className="flex gap-2 items-end">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => swiperRef.current?.slidePrev()}
            size={22}
          />
          <ArrowRight
            className="cursor-pointer"
            onClick={() => swiperRef.current?.slideNext()}
            size={22}
          />
        </div>
      </div>
      <div className="mt-14 lg:mx-8">
        <Swiper
          className="w-full"
          slidesPerView={1}
          breakpoints={{
            740: { slidesPerView: 2 },
            1300: { slidesPerView: 3 },
          }}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, Pagination, A11y]}
        >
          {testimonialData.map((items, index) => (
            <SwiperSlide key={index}>
              <div className="border mx-auto transition-all border-slate-300 lg:py-5 lg:px-8 px-4 py-3 w-[300px] h-auto lg:w-[400px] lg:h-[240px] rounded-3xl">
                <div className="flex gap-x-2">
                  <Star className="w-5 text-yellow-400 fill-current" />
                  <Star className="w-5 text-yellow-400 fill-current" />
                  <Star className="w-5 text-yellow-400 fill-current" />
                  <Star className="w-5 text-yellow-400 fill-current" />
                  <Star className="w-5 text-yellow-400 fill-current" />
                </div>
                <div className="flex items-center gap-x-2 my-3">
                  <h1 className="lg:text-[22px] text-lg font-bold">
                    {items.name}
                  </h1>
                  <CircleCheck
                    size={28}
                    className="text-white fill-green-600"
                  />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm lg:text-[16px]">
                    {items.text}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
