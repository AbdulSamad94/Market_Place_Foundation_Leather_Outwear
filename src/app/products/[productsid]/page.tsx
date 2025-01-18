import React from "react";
import { client } from "@/sanity/lib/client";
import { productQuery } from "@/sanity/lib/queries";

interface RouteParams {
  params: {
    productsid: string;
  };
}
const page = async ({ params }: RouteParams) => {
  const productsdata = await client.fetch(productQuery);
  console.log(productsdata);
  return <div>page</div>;
};

export default page;
