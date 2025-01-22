import React, { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";
import { ProductGrid } from "./products-grid";
import Loader from "../Loader";

const ClientProductsGrid = async () => {
  const products = await client.fetch(productsQuery);
  if (!products)
    return (
      <h1 className="text-4xl font-semibold text-center mt-24">
        No Products Available!
      </h1>
    );
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <ProductGrid products={products} />
      </Suspense>
    </div>
  );
};

export default ClientProductsGrid;
