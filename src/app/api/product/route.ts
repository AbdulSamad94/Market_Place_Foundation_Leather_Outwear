import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        throw new Error("Failed to fetch product data")
    }
    const product = await response.json()
    return NextResponse.json(product);
}