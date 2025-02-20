import Image from "next/image";
import { Star, StarHalf } from "lucide-react";
import { Product } from "@/types/products";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules"; // Import Autoplay
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { motion } from "framer-motion";
import { integralCF } from "@/app/fonts/fonts";

interface CustomOffersProps {
  styling: string;
  text: string;
  arrivalData: Product[] | null;
  isLoading?: boolean;
}

// Animation variants for CustomOffers
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  }, // Stagger children for a cascading effect
};

const headingVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const CustomOffers: React.FC<CustomOffersProps> = ({
  styling,
  text,
  arrivalData,
  isLoading = false,
}) => {
  return (
    <motion.section
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      <div>
        <motion.h1
          className={`${styling} ${integralCF.className} py-4 text-[40px] font-bold text-center mx-auto`}
          variants={headingVariant}
        >
          {text}
        </motion.h1>
      </div>
      <div className="lg:mx-8">
        <Swiper
          slidesPerView={1}
          breakpoints={{
            680: { slidesPerView: 2 },
            930: { slidesPerView: 2 },
            1300: { slidesPerView: 4 },
          }}
          loop={true}
          modules={[Navigation, Pagination, A11y, Autoplay]} // Add Autoplay to modules
          className="flex justify-center md:flex-row flex-col md:gap-y-0 gap-y-12 items-center mt-14 mx-auto w-full"
          autoplay={{
            // Enable autoplay
            delay: 3000, // Set delay between slides in milliseconds (3 seconds)
            disableOnInteraction: false, // Allow autoplay to continue after user interaction
          }}
        >
          {isLoading
            ? // Display skeletons while loading
              Array.from({ length: 4 }).map((_, index) => (
                <SwiperSlide className="mx-auto" key={index}>
                  <div className="cursor-pointer">
                    {/* Skeleton for the image */}
                    <Skeleton className="w-[295px] h-[270px] rounded-3xl" />
                    {/* Skeleton for the title */}
                    <Skeleton className="w-48 h-6 mt-3" />
                    {/* Skeleton for the price */}
                    <Skeleton className="w-32 h-6 mt-2" />
                  </div>
                </SwiperSlide>
              ))
            : arrivalData?.map((items, index) => (
                <SwiperSlide className="mx-auto" key={index}>
                  <motion.div
                    variants={slideVariant} // Apply slideVariant to each SwiperSlide content
                  >
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
                        } rounded-3xl w-[295px]`}
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
                          <h1 className="font-bold text-zinc-500 text-xl line-through">
                            ${items.price - 40}
                          </h1>
                          <p
                            className={`${
                              items.discountPercent > 0
                                ? "text-[10px] text-orange-600 font-semibold text-center rounded-full w-12 h-6 py-1 px-4 flex justify-center items-center bg-orange-100"
                                : "hidden"
                            }`}
                          >
                            {items.discountPercent}%
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
      <div className="flex justify-center mt-8">
        <motion.button
          className="border border-slate-300 px-8 py-3 text-base w-56 rounded-full font-semibold text-center"
          variants={slideVariant} // Apply slideVariant to the button as well
        >
          View All
        </motion.button>
      </div>
    </motion.section>
  );
};

export default CustomOffers;
