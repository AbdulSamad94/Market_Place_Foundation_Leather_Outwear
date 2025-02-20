"use client";
import { useState } from "react";
import { ChevronRight, Tag, ArrowRight } from "lucide-react";
import { HiMiniTrash } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { loadStripe } from "@stripe/stripe-js";
import { integralCF } from "@/app/fonts/fonts";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const { cartDetails, totalPrice, removeItem, setItemQuantity } =
    useShoppingCart();

  const discount = Object.values(cartDetails || {}).reduce(
    (acc, item) => acc + item.price * 0.2 * item.quantity,
    0
  );

  const subAmount = Object.values(cartDetails || {}).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const handleCheckOut = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe.js has not loaded properly.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartDetails: Object.values((totalAmount && cartDetails) || {}),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      if (sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Error redirecting to checkout:", error);
          setLoading(false);
        }
      } else {
        console.error("No session ID returned.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };

  const theDiscount = Number(discount);
  const totalAmount = subAmount - discount;

  if (cartDetails && Object.keys(cartDetails).length === 0) {
    return (
      <div className="py-40 flex justify-center items-center text-1 flex-col">
        <h1 className="text-indigo-900 text-4xl">Your Cart Is Empty</h1>
        <p className="text-center my-8 text-indigo-900">Please Add Items :)</p>
      </div>
    );
  }

  return (
    <section className="bg-white lg:px-10 lg:mx-5 mx-auto px-5">
      <div className="border-t border-slate-300">
        <div className="mt-4 flex">
          <Link href="/" className="text-slate-600 flex items-center gap-x-1">
            Home <ChevronRight size={18} />
          </Link>
          <p className="ml-2 font-medium">Cart</p>
        </div>
        <h1 className={`${integralCF.className} text-[40px] font-bold my-6`}>
          Your Cart
        </h1>
        {/* MainDiv */}
        <div className="flex md:flex-row flex-col justify-center gap-4">
          {/* LeftSide */}
          <div className="flex h-fit border rounded-xl md:w-[60%] w-full border-slate-300 py-4 px-4 flex-col gap-3">
            {Object.values(cartDetails || {}).map((item, index, items) => (
              <div
                key={index}
                className={`py-4 ${items.length > 1 && index !== items.length - 1 ? "border-b border-slate-200" : ""}`}
              >
                <div className="flex justify-between gap-x-4">
                  {/* Image */}
                  <div className="border px-2 py-2 rounded-lg">
                    {item.image && (
                      <Image
                        width={80}
                        height={80}
                        alt="img"
                        src={item.image}
                      />
                    )}
                  </div>
                  {/* Text and controls */}
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col justify-between w-full">
                      <div>
                        <h1 className="md:text-xl text-lg font-bold">
                          {item.name}
                        </h1>
                        <p className="lg:text-sm text-xs">
                          Size:{" "}
                          <span className="text-slate-500">{item.size}</span>
                        </p>
                      </div>
                      <p className="text-xl font-bold">${item.price}</p>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="md:w-[25px]">
                        <HiMiniTrash
                          onClick={() => removeItem(item.id)}
                          size={25}
                          className="fill-red-600 text-red-600 cursor-pointer"
                        />
                      </div>
                      <div className="mr-2">
                        <input
                          className="w-16 h-8 border rounded-lg text-center border-slate-400"
                          type="number"
                          max={5}
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            setItemQuantity(
                              item.id,
                              parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* RightSide */}
          <div className="border md:w-[35%] w-full h-fit border-slate-300 px-3 py-4 rounded-xl">
            <h1 className="text-2xl font-bold">Order Summary</h1>
            <div className="flex justify-between mt-5">
              <p className="text-slate-500">SubTotal</p>
              {totalPrice && (
                <p className="font-bold text-lg">${totalPrice.toFixed(2)}</p>
              )}
            </div>
            <div className="flex justify-between mt-5">
              <p className="text-slate-500">Discount(-20%)</p>
              <p className="font-bold text-lg text-red-600">
                -${theDiscount.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between mt-5">
              <p className="text-slate-500">Delivery Fee</p>
              <p className="font-bold text-lg">$30</p>
            </div>
            <div className="w-full h-[2px] bg-slate-200 rounded-full my-5"></div>
            <div className="flex justify-between mt-5">
              <p className="text-black text-lg">Total</p>
              <p className="font-bold text-xl">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex gap-2 mt-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Add promo code"
                  className="bg-slate-200 w-full pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-black"
                />
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              </div>
              <button className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-black transition-colors">
                Apply
              </button>
            </div>
            <button
              onClick={handleCheckOut}
              disabled={loading}
              className={`text-white w-full mt-4 px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors disabled:opacity-50 ${
                loading
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-black hover:bg-gray-900"
              }`}
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>Go to Checkout</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
