// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const db = await connectToDB();

  const productsCollection = db.collection("products");

  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");
  const minPrice = parseFloat(searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(searchParams.get("maxPrice") || "9999999");
  const name = searchParams.get("name");
  const optionKey = searchParams.get("optionKey"); // e.g. "color"
  const optionValue = searchParams.get("optionValue"); // e.g. "red"
  const sortBy = searchParams.get("sortBy"); // e.g. "reviews" or "price"
  const sortDir = searchParams.get("sortDir") === "asc" ? 1 : -1;

  const filter: any = {
    price: { $gte: minPrice, $lte: maxPrice },
  };

  if (category) {
    filter.category = category;
  }

  if (name) {
    filter.name = { $regex: name, $options: "i" }; // case-insensitive search
  }

  if (optionKey && optionValue) {
    const key = `options.${optionKey}`; // e.g., options.color
    filter[key] = optionValue;
  }

  const sort: any = {};
  if (sortBy === "reviews") sort.reviewsCount = sortDir;
  if (sortBy === "price") sort.price = sortDir;

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  const products = await productsCollection
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray();

  return NextResponse.json(products);
}
