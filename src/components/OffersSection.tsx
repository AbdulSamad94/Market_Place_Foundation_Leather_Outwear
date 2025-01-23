"use client";
import { useEffect, useState } from "react";
import CustomOffers from "./CustomOffers";
import { client } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";
import { Product } from "@/types/products";

const OffersSection = () => {
  const [newProducts, setNewProducts] = useState<Product[] | null>(null);
  const [topSelling, setTopSelling] = useState<Product[] | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
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

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  if (!isOnline) {
    return (
      <h1 className="text-4xl text-center font-bold my-16 text-red-500">
        You are offline. Please check your network connection.
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="text-4xl text-center font-bold my-16 text-red-500">
        {error}
      </h1>
    );
  }

  if (!newProducts || !topSelling) {
    return (
      <h1 className="text-4xl text-center font-bold my-16 text-red-500">
        Loading products...
      </h1>
    );
  }

  return (
    <div>
      <CustomOffers
        styling={"uppercase"}
        text={"new arrivals"}
        arrivalData={newProducts}
      />
      <div className="w-full h-[1px] bg-slate-200 mt-16 mb-8"></div>
      <CustomOffers
        styling={"lowercase"}
        text={"top selling"}
        arrivalData={topSelling}
      />
    </div>
  );
};

export default OffersSection;
