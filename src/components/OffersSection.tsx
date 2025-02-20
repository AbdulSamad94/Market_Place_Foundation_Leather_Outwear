"use client";
import { Suspense, useEffect, useState } from "react";
import CustomOffers from "./CustomOffers";
import { client } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";
import { Product } from "@/types/products";

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
      <h1 className="text-4xl text-center font-bold my-16 text-red-500">
        {error}
      </h1>
    );
  }

  return (
    <Suspense>
      {/* New Arrivals Section */}
      <CustomOffers
        styling={"uppercase"}
        text={"new arrivals"}
        arrivalData={newProducts}
        isLoading={!newProducts} // Pass loading state
      />

      {/* Divider */}
      <div className="w-full h-[1px] bg-slate-200 my-8"></div>

      {/* Top Selling Section */}
      <CustomOffers
        styling={"lowercase"}
        text={"top selling"}
        arrivalData={topSelling || []}
        isLoading={!topSelling} // Pass loading state
      />
    </Suspense>
  );
};

export default OffersSection;
