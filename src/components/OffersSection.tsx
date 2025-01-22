"use client";
import { useEffect, useState } from "react";
import CustomOffers from "./CustomOffers";
import { client } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";
import { Product } from "@/types/products";

const OffersSection = () => {
  const [newProducts, setNewProducts] = useState<Product[] | null>(null);
  const [topSelling, setTopSelling] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchNewData = async () => {
      const data: Product[] = await client.fetch(productsQuery);
      const newArrivals = data.filter((e) => e.isNew);
      setNewProducts(newArrivals);
    };
    fetchNewData();
  }, []);

  useEffect(() => {
    const fetchNewData = async () => {
      const data: Product[] = await client.fetch(productsQuery);
      const topSelling = data.filter((e) => !e.isNew);
      setTopSelling(topSelling);
    };
    fetchNewData();
  }, []);

  return (
    <div>
      <CustomOffers
        styling={"uppercase"}
        text={"new arrivals"}
        arrivalData={newProducts || []}
      />
      <div className="w-full h-[1px] bg-slate-200 mt-16 mb-8"></div>
      <CustomOffers
        styling={"lowercase"}
        text={"top selling"}
        arrivalData={topSelling || []}
      />
    </div>
  );
};

export default OffersSection;
