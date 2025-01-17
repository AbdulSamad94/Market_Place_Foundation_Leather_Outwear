"use client";
import React from "react";
import CustomOffers from "./CustomOffers";
import { ArrivalItem } from "./TypeSafety";

const newArrivalsData: ArrivalItem[] = [
  {
    image: "/offers/image1.png",
    text: "T-shirt with Tape Details",
    price: "$120",
  },
  {
    image: "/offers/image2.png",
    text: "Skinny Fit Jeans",
    price: "$240",
    prevPrice: "$260",
    badge: "-20%",
  },
  {
    image: "/offers/image3.png",
    text: "Checkered Shirt",
    price: "$180",
  },
  {
    image: "/offers/image4.png",
    text: "Sleeve Striped T-shirt",
    price: "$130",
    prevPrice: "$160",
    badge: "-30%",
  },
];

const topSelling: ArrivalItem[] = [
  {
    image: "/offers/image5.png",
    text: "Vertical Stripped Shirt",
    price: "$212",
    prevPrice: "$232",
    badge: "-20%",
  },
  {
    image: "/offers/image6.png",
    text: "Courage Graphic T-shirt",
    price: "$145",
  },
  {
    image: "/offers/image7.png",
    text: "Loose Fit Bermuda Shorts",
    price: "$80",
  },
  {
    image: "/offers/image8.png",
    text: "Faded Skinny Jeans",
    price: "$210",
  },
];

const OffersSection = () => {
  return (
    <div>
      <CustomOffers
        styling={"uppercase"}
        text={"new arrivals"}
        arrivalData={newArrivalsData}
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
