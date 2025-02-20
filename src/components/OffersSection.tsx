"use client";
import { Suspense, useEffect, useState } from "react";
import CustomOffers from "./CustomOffers";
import { client } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";
import { Product } from "@/types/products";
import { motion } from "framer-motion"; // Import motion

// Animation variants for OffersSection
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const errorVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const OffersSection = () => {
  const [newProducts, setNewProducts] = useState<Product[] | null>(null);
  const [topSelling, setTopSelling] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Product[] = await client.fetch(productsQuery);
        if (!data) {
          throw new Error("Failed to fetch product data!");
        }
        setNewProducts(data.filter((e) => e.isNew));
        setTopSelling(data.filter((e) => !e.isNew));
        setError(null);
      } catch (err) {
        setError(` ${err}, Failed to load products. Please try again later.`);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <motion.h1
        className="text-4xl text-center font-bold my-16 text-red-500"
        variants={errorVariant}
        initial="hidden"
        animate="visible"
      >
        {error}
      </motion.h1>
    );
  }

  return (
    <motion.section
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of section is visible
      className="overflow-hidden" // Add overflow-hidden to the section
    >
      <Suspense>
        {/* New Arrivals Section */}
        <CustomOffers
          styling={"uppercase"}
          text={"new arrivals"}
          arrivalData={newProducts}
          isLoading={!newProducts}
        />

        {/* Divider */}
        <div className="w-full h-[1px] bg-slate-200 my-8"></div>

        {/* Top Selling Section */}
        <CustomOffers
          styling={"lowercase"}
          text={"top selling"}
          arrivalData={topSelling || []}
          isLoading={!topSelling}
        />
      </Suspense>
    </motion.section>
  );
};

export default OffersSection;
