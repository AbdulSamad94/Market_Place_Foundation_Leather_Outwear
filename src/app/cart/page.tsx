"use client";
import { ChevronRight } from "lucide-react";
import { HiMiniTrash } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";

const Page = () => {
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
        <h1 className="text-[40px] font-bold my-6">Your Cart</h1>
        {/* MainDiv */}
        <div className="flex md:flex-row flex-col justify-center gap-4">
          {/* LeftSide */}
          <div className="flex h-fit border rounded-xl md:w-[60%] w-full border-slate-300 py-4 px-4 flex-col gap-3">
            {Object.values(cartDetails || {}).map((item, index) => (
              <div key={index} className="border-b py-4 border-slate-200">
                <div className="flex justify-between gap-x-4">
                  {/* imggggg */}
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
                  {/* texttttt */}
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col justify-between w-full">
                      <div>
                        <h1 className="md:text-xl text-lg font-bold">
                          {item.name}
                        </h1>
                        <p className="lg:text-sm text-xs">
                          Size :{" "}
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
              <p className="text-slate-500">Total</p>
              <p className="font-bold text-xl">${totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
