"use client";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { ProductCard } from "./product-card";
import { Filters } from "./filters";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Product } from "@/types/products";
import { useSearch } from "@/context/ContextProvider";
import { motion } from "motion/react"; // Import motion from framer-motion

const sortOptions = [
  { label: "Most Popular", value: "most-popular" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-low-high" },
  { label: "Price: High to Low", value: "price-high-low" },
];

export function ProductGrid({
  products: initialProducts,
}: {
  products: Product[];
}) {
  // Rename prop and use initialProducts
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const { searchQuery } = useSearch(); // Get the search query from context
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // State for selected categories
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([
    50, 200,
  ]); // State for price range
  const [products, setProducts] = useState<Product[]>(initialProducts); // State to hold products, initialize with props

  // Function to handle category filter changes from Filters component
  const handleCategoryFilterChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  // Function to handle price range filter changes from Filters component
  const handlePriceRangeChange = (priceRange: number[]) => {
    setSelectedPriceRange(priceRange);
  };

  // useEffect to filter products whenever selectedCategories or searchQuery or selectedPriceRange changes
  useEffect(() => {
    let filtered = initialProducts; // Start with all products

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => {
        if (!product.tags) return false; // Skip products without tags
        return product.tags.some((tag) => selectedCategories.includes(tag)); // Check if any tag is in selectedCategories
      });
    }

    // Price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= selectedPriceRange[0] &&
        product.price <= selectedPriceRange[1]
    );

    setProducts(filtered); // Update the products state with filtered products
  }, [searchQuery, selectedCategories, selectedPriceRange, initialProducts]); // Effect dependency on searchQuery, selectedCategories, and selectedPriceRange

  // useEffect to list unique tags (categories) from products
  useEffect(() => {
    if (initialProducts) {
      const allTags = initialProducts.reduce((tagsArray: string[], product) => {
        if (product.tags) {
          return tagsArray.concat(product.tags);
        }
        return tagsArray;
      }, []);

      const uniqueTags = [...new Set(allTags)];

      console.log("Unique Tags (Categories) from Products:", uniqueTags);
    }
  }, [initialProducts]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900">All Products</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            All Products
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-gray-500 text-sm sm:text-base font-normal">
              Showing 1-12 of 100 Products{" "}
              {/* You might want to update this dynamically based on filtered products */}
            </span>
            <div className="flex items-center gap-4">
              <button
                className="sm:hidden flex items-center gap-2 px-3 py-2 border rounded-lg"
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-sm">Filters</span>
              </button>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:border-black transition-colors">
                  <span className="text-sm">Sort by: {selectedSort.label}</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="bg-white rounded-lg shadow-lg border p-1 min-w-[200px]">
                    {sortOptions.map((option) => (
                      <DropdownMenu.Item
                        key={option.value}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm rounded-md cursor-pointer outline-none",
                          option.value === selectedSort.value
                            ? "bg-gray-100"
                            : "hover:bg-gray-50"
                        )}
                        onClick={() => setSelectedSort(option)}
                      >
                        {option.label}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <Filters
              onCategoryFilterChange={handleCategoryFilterChange}
              onPriceRangeChange={handlePriceRangeChange} // Add this prop
            />
          </div>

          {/* Mobile Filters */}
          <Filters
            isMobile
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onCategoryFilterChange={handleCategoryFilterChange}
            onPriceRangeChange={handlePriceRangeChange} // Add this prop
          />

          {/* Product Grid */}
          <div className="flex-1">
            {products.length === 0 && (
              <div className="text-center mt-24">
                <h1 className="text-4xl font-semibold text-center">
                  No Products Available!
                </h1>
              </div>
            )}
            <motion.div // Changed div to motion.div and added animation props
              className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product.slug.current}`}
                  className="cursor-pointer"
                >
                  <ProductCard {...product} />
                </Link>
              ))}
            </motion.div>

            {/* Pagination */}
            <div className="mt-8 sm:mt-12 flex items-center justify-center gap-1 sm:gap-2">
              <button className="p-1 sm:p-2 border rounded-lg hover:border-black transition-colors">
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              {[1, 2, 3, "...", 9, 10].map((page, i) => (
                <button
                  key={i}
                  className={cn(
                    "px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm sm:text-base",
                    page === 2 ? "bg-black text-white" : "hover:bg-gray-100"
                  )}
                >
                  {page}
                </button>
              ))}
              <button className="p-1 sm:p-2 border rounded-lg hover:border-black transition-colors">
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
