"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CartTotals } from "@/types/cart";

interface CalculateCardProps {
  totals: CartTotals;
  onDiscountChange: (value: number) => void;
  onShippingChange: (value: number) => void;
  onReset: () => void;
  onPayNow: () => void;
}

export function CalculateCard({
  totals,
  onDiscountChange,
  onShippingChange,
  onReset,
  onPayNow,
}: CalculateCardProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Discount (%)</label>
          <Input
            type="number"
            value={totals.discount}
            onChange={(e) => onDiscountChange(Number(e.target.value))}
            placeholder="Enter discount"
          />
        </div>
        <div>
          <label className="text-sm font-medium">
            Shipping (€{totals.shipping.toFixed(2)})
          </label>
          <Input
            type="number"
            value={totals.shipping}
            onChange={(e) => onShippingChange(Number(e.target.value))}
            placeholder="Enter shipping cost"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Total QTY:</span>
          <span>{totals.totalQty}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Tax:</span>
          <span>€{totals.totalTax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Sub Total:</span>
          <span>€{totals.subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>€{totals.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="md:col-span-2 grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={onReset} className="w-full">
          Reset (F4)
        </Button>
        <Button onClick={onPayNow} className="w-full">
          Pay Now (F5)
        </Button>
      </div>
    </div>
  );
}
