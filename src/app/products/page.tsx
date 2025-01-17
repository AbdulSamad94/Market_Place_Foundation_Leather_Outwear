import { Suspense } from "react";
import Loader from "@/components/Loader";
import ClientProductsGrid from "@/components/products/ClientProductsGrid";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>{<Loader />}</div>}>
      <ClientProductsGrid />
    </Suspense>
  );
}
