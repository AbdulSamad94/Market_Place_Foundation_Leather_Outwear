"use client";

import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import * as Accordion from "@radix-ui/react-accordion";
import * as Slider from "@radix-ui/react-slider";

// Define constants for filter options
const categories = ["tshirt", "hoodie", "shirt", "jeans", "short"]; // UPDATE THIS ARRAY with your actual tags from console
const colors = [
  { name: "Green", class: "bg-green-500" },
  { name: "Red", class: "bg-red-500" },
  { name: "Yellow", class: "bg-yellow-500" },
  { name: "Orange", class: "bg-orange-500" },
  { name: "Blue", class: "bg-blue-500" },
  { name: "Purple", class: "bg-purple-500" },
  { name: "Pink", class: "bg-pink-500" },
  { name: "Black", class: "bg-black" },
];
const sizes = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "2X-Large",
  "3X-Large",
  "4X-Large",
];
const styles = ["Casual", "Formal", "Party", "Gym"];

// Define props interface for the Filters component
interface FiltersProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onCategoryFilterChange: (categories: string[]) => void;
  onPriceRangeChange: (priceRange: number[]) => void; // Add this prop
}

export function Filters({
  isMobile,
  isOpen,
  onClose,
  onCategoryFilterChange,
  onPriceRangeChange, // Destructure the new prop
}: FiltersProps) {
  // State for price range and selected size
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedSize, setSelectedSize] = useState("Small");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // State for selected categories

  // Function to handle filter application
  const handleApplyFilter = () => {
    console.log("Applying filters:", {
      priceRange,
      selectedSize,
      selectedCategories,
    });
    onCategoryFilterChange(selectedCategories);
    onPriceRangeChange(priceRange); // Pass priceRange to parent
    onClose?.();
  };

  const handleCategoryCheckboxChange = (category: string) => {
    setSelectedCategories((prevCategories) => {
      const isCategorySelected = prevCategories.includes(category);
      if (isCategorySelected) {
        // Remove category if already selected
        return prevCategories.filter((cat) => cat !== category);
      } else {
        // Add category if not selected
        return [...prevCategories, category];
      }
    });
  };

  // Main content of the filter component
  const filterContent = (
    <div
      className={cn(
        "flex flex-col h-full py-8 px-4 border border-slate-300 rounded-3xl",
        isMobile ? "bg-white" : ""
      )}
    >
      {/* Mobile header */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-medium">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Scrollable filter options */}
      <div className={cn("flex-1 overflow-auto", isMobile ? "p-4" : "")}>
        {/* Categories accordion */}
        <Accordion.Root type="multiple" className="space-y-4">
          {categories.map((category) => (
            <Accordion.Item className="group" key={category} value={category}>
              <Accordion.Trigger className="flex items-center justify-between w-full text-left">
                <span className="text-sm group-hover:underline">
                  {category}
                </span>
                <ChevronRight className="h-4 w-4 transform transition-transform duration-200 group-data-[state=open]:rotate-90" />
              </Accordion.Trigger>
              <Accordion.Content className="pt-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedCategories.includes(category)} // Control checkbox state
                      onChange={() => handleCategoryCheckboxChange(category)} // Handle checkbox change
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                  {/* Add more subcategories as needed */}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        {/* Other filter options */}
        <div className="space-y-6 mt-6">
          {/* Price range slider */}
          <div className="space-y-4">
            <h3 className="font-medium">Price</h3>
            <Slider.Root
              className="relative flex items-center w-full h-5"
              value={priceRange}
              max={200}
              step={1}
              onValueChange={setPriceRange}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
                <Slider.Range className="absolute bg-black rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-5 h-5 bg-black rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2" />
              <Slider.Thumb className="block w-5 h-5 bg-black rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2" />
            </Slider.Root>
            <div className="flex items-center justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Color options */}
          <div className="space-y-4">
            <h3 className="font-medium">Colors</h3>
            <div className="grid grid-cols-5 gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={cn(
                    "w-8 h-8 rounded-full ring-2 ring-offset-2 ring-transparent hover:ring-gray-300 focus:ring-gray-300",
                    color.class
                  )}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size options */}
          <div className="space-y-4">
            <h3 className="font-medium">Size</h3>
            <div className="grid grid-cols-2 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "px-3 py-2 text-xs border rounded-full transition-colors",
                    size === selectedSize
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-black"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Dress style options */}
          <div className="space-y-4">
            <h3 className="font-medium">Dress Style</h3>
            {styles.map((style) => (
              <div
                key={style}
                className="flex items-center justify-between py-2"
              >
                <span className="text-sm">{style}</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apply filter button */}
      <div className="p-4 border-t bg-white">
        <button
          onClick={handleApplyFilter}
          className="w-full py-4 bg-black text-white rounded-full hover:bg-gray-900 transition-colors"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );

  // Render mobile or desktop version based on isMobile prop
  if (isMobile) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-50 transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="absolute right-0 top-0 bottom-0 w-[80%] max-w-md transform h-full">
          {filterContent}
        </div>
      </div>
    );
  }

  return <div className="w-64 flex-shrink-0">{filterContent}</div>;
}
