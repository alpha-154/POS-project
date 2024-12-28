"use client";

import { Cart } from "./Cart";
import { Products } from "./Products";

export default function SellPage() {
  return (
    <div className="flex items-start justify-between gap-4 min-h-screen">
      <Cart />
      <Products />
    </div>
  );
}
