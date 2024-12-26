"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Product } from "@/types/cart";

interface CartProductProps {
  product: Product;
  onQuantityChange: (id: number, quantity: number) => void;
  onDiscountChange: (id: number, discount: number) => void;
  onDelete: (id: number) => void;
}

export function CartProduct({
  product,
  onQuantityChange,
  onDiscountChange,
  onDelete,
}: CartProductProps) {
  const [isEditingDiscount, setIsEditingDiscount] = useState(false);
  const [localDiscount, setLocalDiscount] = useState(product.discount || 0);

  const handleDiscountSubmit = () => {
    onDiscountChange(product.productId, localDiscount);
    setIsEditingDiscount(false);
  };

  const subtotal =
    product.price * (product.quantity || 1) * (1 - (localDiscount || 0) / 100);

  return (
    <div className="grid grid-cols-6 gap-4 items-center py-4 border-b">
      <div className="col-span-2">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          TAX: {product.tax}% ({product.taxType})
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            onQuantityChange(product.productId, (product.quantity || 1) - 1)
          }
          disabled={(product.quantity || 1) <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={product.quantity || 1}
          onChange={(e) =>
            onQuantityChange(product.productId, parseInt(e.target.value))
          }
          className="w-16 text-center"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            onQuantityChange(product.productId, (product.quantity || 1) + 1)
          }
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-right">
        €{product.price.toFixed(2)}
        <span className="text-sm text-muted-foreground">(Retail)</span>
      </div>

      <div className="flex items-center gap-2">
        {isEditingDiscount ? (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={localDiscount}
              onChange={(e) => setLocalDiscount(Number(e.target.value))}
              className="w-16"
            />
            <Button size="sm" onClick={handleDiscountSubmit}>
              Save
            </Button>
          </div>
        ) : (
          <>
            {localDiscount}%
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditingDiscount(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span>€{subtotal.toFixed(2)}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(product.productId)}
          className="text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
