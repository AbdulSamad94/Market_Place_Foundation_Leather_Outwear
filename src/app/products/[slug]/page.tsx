"use client";

import { ChevronRight, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { Product } from "@/types/products";
import { client } from "@/sanity/lib/client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { ProductSkeleton } from "@/components/ProductSkeleton";

const sizeData = [
  { name: "Small" },
  { name: "Medium" },
  { name: "Large" },
  { name: "X-Large" },
];

type ProductPageProps = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: ProductPageProps) => {
  const { addItem } = useShoppingCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res: Product[] = await client.fetch(`*[_type == "product"]{
        _id,
        slug,
        name,
        description,
        price,
        discountPercent,
        tags[],
        sizes[],
        colors[],
        isNew,
        "imageUrl": image.asset->url
      }`);
      const data = res.find((e) => e.slug.current === params.slug);
      if (data) {
        setProduct(data);
      } else {
        setProduct(null);
        console.error("Product not found");
      }
    };
    fetchProducts();
  }, [params.slug]);

  if (!product) {
    return <ProductSkeleton />;
  }

  const handleAddToCart = () => {
    try {
      if (!size) return toast.error("Select Any Size");
      addItem({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        quantity: 1,
        size: size,
        color: product.colors,
        currency: "USD",
      });
      toast.success(`"${product.name}" Added To Cart`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="lg:px-10 mx-5 mb-40">
      <div className="border-t border-slate-300">
        <div className="mt-4 flex">
          <Link href="/" className="text-slate-600 flex items-center gap-x-1">
            Home <ChevronRight size={18} />
          </Link>
          <Link
            href="/products"
            className="ml-2 text-slate-700 font-medium flex gap-x-1 items-center"
          >
            Shop <ChevronRight size={18} />
          </Link>
          <p className="font-medium ml-2">{product.tags.join(", ")}</p>
        </div>
        <div className="flex justify-center lg:flex-row flex-col gap-10 mt-12">
          <div className="flex mx-auto lg:flex-row flex-col-reverse">
            <div className="w-full h-full lg:h-32 mt-10 lg:mt-0 flex justify-center">
              <div>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={80}
                  height={80}
                />
              </div>
            </div>
            <div>
              <div className="lg:w-[450px]">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={350}
                  height={350}
                  className="lg:w-[350px] lg:h-[450px] w-[280px] h-[350px] ml-7"
                />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h1 className="lg:text-[40px] text-2xl font-bold">
              {product.name}
            </h1>
            <div className="flex my-4 gap-x-1 items-center">
              <Star className="w-5 text-yellow-400 fill-current" />
              <Star className="w-5 text-yellow-400 fill-current" />
              <Star className="w-5 text-yellow-400 fill-current" />
              <Star className="w-5 text-yellow-400 fill-current" />
              <StarHalf className="w-5 text-yellow-400 fill-current" />
              <p className="font-medium text-sm">
                {4} / <span className="text-slate-500 text-sm">5</span>
              </p>
            </div>
            <h1 className="flex font-bold text-[30px]">${product.price}</h1>
            <p className="text-sm text-slate-600 my-4">{product.description}</p>
            <div className="bg-slate-300 rounded-full mt-6 h-[2px]"></div>
            <p className="text-slate-600 mt-4 text-lg">Choose Size</p>
            <div className="lg:flex gap-5 mt-4 grid grid-cols-2 mx-auto">
              {sizeData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item.name)}
                  className={`${
                    item.name === size ? "bg-black text-white" : "bg-slate-200"
                  } w-28 h-12 rounded-full py-2 px-5 text-center`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-black text-center text-white h-12 w-full px-8 py-3 mt-8 rounded-full flex justify-center items-center"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
