import { NextResponse } from 'next/server';
import { getProducts } from './productAPI';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}





