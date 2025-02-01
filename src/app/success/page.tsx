import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <div className="mt-8 min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center transform transition-all hover:scale-105">
          <div className="flex justify-center mb-6">
            <svg
              className="w-20 h-20 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your transaction has been completed
            successfully.
          </p>
          <Link
            href={"/tracking-page"}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            Get tracking ID
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
