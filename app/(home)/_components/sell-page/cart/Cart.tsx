"use client";

import { useState } from "react";
import { CartProduct } from "./helpers/CartProduct";
import { CalculateCard } from "./helpers/CalculateCard";
import { ResetModal } from "./helpers/ResetModal";
import { PaymentModal } from "./helpers/PaymentModal";

import type { Product, CartTotals, PaymentDetails } from "@/types/cart";

export default function Cart() {
  const [products, setProducts] = useState<Product[]>([
    {
      productId: 101,
      name: "MacBook Air M2",
      image: "macbook-air.jpg",
      categoryName: "Laptop",
      brandName: "Apple",
      warehouseId: 1,
      price: 1299,
      color: "Space Gray",
      size: "13.6-inch",
      tax: 10,
      taxType: "Included",
      localDiscount: 5,
    },
    {
      productId: 102,
      name: "Dell XPS 13 Plus",
      image: "dell-xps.jpg",
      categoryName: "Laptop",
      brandName: "Dell",
      warehouseId: 1,
      price: 1499,
      color: "Platinum",
      size: "13.4-inch",
      tax: 10,
      taxType: "Included",
      localDiscount: 8,
    },
  ]);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [cartDiscount, setCartDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);

  const handleQuantityChange = (id: number, quantity: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.productId === id ? { ...product, quantity } : product
      )
    );
  };

  const handleDiscountChange = (id: number, discount: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.productId === id ? { ...product, discount } : product
      )
    );
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.productId !== id));
  };

  const calculateTotals = (): CartTotals => {
    const totalQty = products.reduce((sum, p) => sum + (p.quantity || 1), 0);
    const subTotal = products.reduce((sum, p) => {
      const price = p.price * (p.quantity || 1);
      const discount = price * ((p.discount || 0) / 100);
      return sum + (price - discount);
    }, 0);
    const totalTax = products.reduce((sum, p) => {
      const price = p.price * (p.quantity || 1);
      return sum + price * (p.tax / 100);
    }, 0);

    const discountAmount = subTotal * (cartDiscount / 100);
    const total = subTotal - discountAmount + shipping + totalTax;

    return {
      totalQty,
      totalTax,
      subTotal,
      total,
      discount: cartDiscount,
      shipping,
    };
  };

  const handleReset = () => {
    setProducts([]);
    setCartDiscount(0);
    setShipping(0);
    setIsResetModalOpen(false);
  };

  const handlePaymentSubmit = (details: PaymentDetails) => {
    // Handle payment submission
    console.log("Payment submitted:", details);
    setIsPaymentModalOpen(false);
  };

  const totals = calculateTotals();

  return (
    <div className="w-full border border-gray-300 rounded-md p-4">
      <div className="space-y-6">
        {products.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No products selected yet
          </div>
        ) : (
          <>
            <div className="grid grid-cols-6 gap-4 font-medium">
              <div className="col-span-2">PRODUCT</div>
              <div>QTY</div>
              <div className="text-right">PRICE</div>
              <div>DISCOUNT</div>
              <div>SUBTOTAL</div>
            </div>

            {products.map((product) => (
              <CartProduct
                key={product.productId}
                product={product}
                onQuantityChange={handleQuantityChange}
                onDiscountChange={handleDiscountChange}
                onDelete={handleDelete}
              />
            ))}
          </>
        )}

        <CalculateCard
          totals={totals}
          onDiscountChange={setCartDiscount}
          onShippingChange={setShipping}
          onReset={() => setIsResetModalOpen(true)}
          onPayNow={() => setIsPaymentModalOpen(true)}
        />
      </div>

      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSubmit={handlePaymentSubmit}
        initialDetails={{
          salesDate: new Date().toISOString().split("T")[0],
          totalProducts: totals.totalQty,
          totalAmount: totals.subTotal,
          discount: totals.subTotal * (totals.discount / 100),
          shipping: totals.shipping,
          grandTotal: totals.total,
          payingAmount: totals.total,
          paymentStatus: "pending",
          dueAmount: 0,
          changeReturn: 0,
        }}
      />
    </div>
  );
}
