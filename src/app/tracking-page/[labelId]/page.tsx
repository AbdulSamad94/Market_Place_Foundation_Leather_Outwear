"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";

interface TrackingObject {
  trackingNumber: string;
  labelId: string;
  carrierCode: string;
}

interface RouteId {
  params: Promise<{
    labelId: string;
  }>;
}

const GetLabelPage = ({ params }: RouteId) => {
  const [loading, setLoading] = useState(false);
  const [labelPdf, setLabelPdf] = useState<string | null>(null);
  const [trackingObj, setTrackingObj] = useState<TrackingObject | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [rateId, setRateId] = useState<string>("");

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const { labelId } = await params;
        setRateId(labelId);
      } catch (error) {
        console.error("Error resolving params:", error);
        setErrors(["Failed to resolve parameters."]);
      }
    };

    resolveParams();
  }, [params]);

  const handleCreateLabel = async () => {
    if (!rateId) {
      setErrors(["Rate ID is missing."]);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const response = await axios.post("/api/shipengine/label", { rateId });
      const labelData = response.data;
      setLabelPdf(labelData.labelDownload.href);
      setTrackingObj({
        trackingNumber: labelData.trackingNumber,
        labelId: labelData.labelId,
        carrierCode: labelData.carrierCode,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      setErrors([
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          "An error occurred while creating the label.",
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-black to-slate-700 text-center mb-10 animate-pulse duration-1000">
          Generate Your Shipping Label
        </h1>
        {errors.length > 0 && (
          <div className="space-y-2 mb-6">
            {errors.map((error, index) => (
              <p
                key={index}
                className="text-red-500 text-sm bg-red-100 p-3 rounded-lg shadow"
              >
                {error}
              </p>
            ))}
          </div>
        )}
        {!labelPdf && !trackingObj && (
          <button
            onClick={handleCreateLabel}
            disabled={loading}
            className="px-6 py-3 w-full font-semibold text-white text-lg bg-gradient-to-r from-green-600 to-green-800 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Label..." : "Create Label"}
          </button>
        )}
        {labelPdf && (
          <div className="mt-10 text-center">
            <Link href={labelPdf} target="_blank">
              <button className="px-6 py-3 font-semibold text-lg text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Download Label
              </button>
            </Link>
          </div>
        )}
        {trackingObj && (
          <div className="mt-10 bg-gray-100 p-6 rounded-xl shadow-lg">
            <p className="text-lg">
              <span className="font-bold text-gray-700">Tracking Number:</span>{" "}
              {trackingObj.trackingNumber}
            </p>
            <p className="text-lg">
              <span className="font-bold text-gray-700">Label ID:</span>{" "}
              {trackingObj.labelId}
            </p>
            <p className="text-lg">
              <span className="font-bold text-gray-700">Carrier Code:</span>{" "}
              {trackingObj.carrierCode}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetLabelPage;
