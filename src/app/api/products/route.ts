
import { NextResponse } from "next/server";
import { Product } from "../../../types/product";

let products: Product[] = [];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const newProduct: Product = await request.json();
  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}
