"use client";
import React, { useState } from "react";
import axios from "axios";
import { Address, Rate } from "@/types/shipengine";
import { cartProductsWhichCanBeShipped } from "@/types/shipengineData";
import Link from "next/link";

const ShippingRatesPage = () => {
  const [shipeToAddress, setshipeToAddress] = useState<Address>({
    name: "",
    phone: "",
    addressLine1: "456 Oak Avenue",
    addressLine2: "Suite 200",
    cityLocality: "Los Angeles",
    stateProvince: "CA",
    postalCode: "90001",
    countryCode: "US",
    addressResidentialIndicator: "no",
  });

  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setRates([]);

    try {
      const response = await axios.post("/api/shipengine/get-rates", {
        shipeToAddress,
        packages: cartProductsWhichCanBeShipped.map((product) => ({
          weight: product.weight,
          dimensions: product.dimensions,
        })),
      });
      setRates(response.data.shipmentDetails.rateResponse.rates);
    } catch (error) {
      console.error(error);
      setErrors(["An error occurred while fetching rates."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-black bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Generate Shipping Rates
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Ship To Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={shipeToAddress.name}
                onChange={(e) =>
                  setshipeToAddress({ ...shipeToAddress, name: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={shipeToAddress.phone}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    phone: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Address Line 1"
                value={shipeToAddress.addressLine1}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    addressLine1: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Address Line 2"
                value={shipeToAddress.addressLine2}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    addressLine2: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="City"
                value={shipeToAddress.cityLocality}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    cityLocality: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="State/Province"
                value={shipeToAddress.stateProvince}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    stateProvince: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={shipeToAddress.postalCode}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    postalCode: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Country Code (e.g., PK)"
                value={shipeToAddress.countryCode}
                onChange={(e) =>
                  setshipeToAddress({
                    ...shipeToAddress,
                    countryCode: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400"
          >
            {loading ? "Calculating..." : "Get Shipping Rates"}
          </button>
        </form>
        {rates.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Available Shipping Rates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              {rates.map((rate) => (
                <Link
                  href={`/tracking-page/${rate.rateId}`}
                  key={rate.rateId}
                  className="block p-6 border rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Carrier
                      </span>
                      <p className="text-lg font-semibold text-gray-800">
                        {rate.carrierFriendlyName}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Service
                      </span>
                      <p className="text-lg text-gray-800">
                        {rate.serviceType}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Cost
                      </span>
                      <p className="text-lg text-gray-800">
                        {rate.shippingAmount.amount}{" "}
                        {rate.shippingAmount.currency}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {errors.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Errors</h2>
            <div className="space-y-2">
              {errors.map((error, index) => (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingRatesPage;
