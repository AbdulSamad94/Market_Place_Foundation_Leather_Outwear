import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/types/products";

export function ProductCard({
  name,
  price,
  imageUrl,
  discountPercent,
}: Product) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                Math.floor(4)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              )}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">({30})</span>
        </div>
        <h3 className="font-medium line-clamp-1">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-medium">${price}</span>
          {
            <>
              <span className={` text-sm text-gray-500 line-through`}>
                ${price - 40}
              </span>
              <span className="text-xs text-red-600">-{discountPercent}%</span>
            </>
          }
        </div>
      </div>
    </div>
  );
}
