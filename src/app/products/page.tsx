import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ClientProductsGrid from "@/components/products/ClientProductsGrid";

export default function ProductsPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <ClientProductsGrid />
    </Suspense>
  );
}
