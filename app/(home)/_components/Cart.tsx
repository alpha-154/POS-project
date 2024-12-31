"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Car, Pencil, ReceiptIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import userData from "@/mockData/userData.json";
import {
  removeFromCart,
  updateItemDiscount,
  updateCartDiscount,
  updateShipping,
  resetCart,
  updateQuantity,
  toggleDiscountEdit,
} from "@/redux/slices/cart.slice";
import type { RootState } from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addPayment } from "@/utils/recentSalesIndexedDB";
import { toast } from "sonner"
import ResetModal from "./ResetModal";
import PaymentModal from "./PaymentModal";

export function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [receivedAmount, setReceivedAmount] = useState("");
  const [paymentType, setPaymentType] = useState("Cash");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [dueAmount, setDueAmount] = useState("0");
  const [changeReturn, setChangeReturn] = useState("0");

  const handleUpdateDiscount = (productId: number, discount: number) => {
    dispatch(updateItemDiscount({ productId, discount }));
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleCartDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateCartDiscount(Number(e.target.value) || 0));
  };

  const handleShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateShipping(Number(e.target.value) || 0));
  };

  const handleReset = () => {
    dispatch(resetCart());
    setIsResetModalOpen(false);
  };

  const handleReceivedAmountChange = (value: string) => {
    setReceivedAmount(value);
    const received = Number(value);
    if (received > cart.total) {
      setChangeReturn((received - cart.total).toFixed(2));
      setDueAmount("0");
    } else {
      setChangeReturn("0");
      setDueAmount((cart.total - received).toFixed(2));
    }
  };

  // Keydown event listener for F4 (Reset) and F5 (Pay Now)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F4" || event.code === "F4") {
        event.preventDefault(); // Prevent browser/system default action
        setIsResetModalOpen(true);
      } else if (event.key === "F5" || event.code === "F5") {
        event.preventDefault(); // Prevent browser/system default action
        setIsPaymentModalOpen(true);
      }
    };
  
    // Add event listener with capture option
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    
    return () => {
      // Cleanup the event listener
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, []);
  
  
  

  return (
    <div className="w-1/2 p-4  border border-gray-200 dark:border-gray-600 rounded-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Cart</h2>
      </div>

      <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr] gap-4 mb-4 font-semibold border border-gray-200 dark:border-gray-600 rounded-md p-2">
        <div>PRODUCT</div>
        <div className="-ml-5">QTY</div>
        <div>PRICE</div>
        <div>DISCOUNT</div>
        <div>SUBTOTAL</div>
        <div>ACTION</div>
      </div>

      <div className="space-y-4 mb-8">
        {cart?.items?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No Product Added</div>
        ) : (
          cart?.items?.map((item) => (
            <div
              key={item.productId}
              className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr] gap-4 items-center border border-gray-200 dark:border-gray-600 rounded-md p-2"
            >
              <div>{item.name}</div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.productId,
                        quantity: item.quantity - 1,
                      })
                    )
                  }
                  disabled={item.quantity <= 1}
                  className="bg-lime-500 hover:bg-lime-500/80 text-white"
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.productId,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                  className="bg-lime-500 hover:bg-lime-500/80 text-white"
                >
                  +
                </Button>
              </div>
              <div>€{item.price.toFixed(2)}</div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={item.discount}
                  className="w-20"
                  disabled={!item.isEditingDiscount}
                  onChange={(e) =>
                    handleUpdateDiscount(item.productId, Number(e.target.value))
                  }
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => dispatch(toggleDiscountEdit(item.productId))}
                >
                  <Pencil className="h-4 w-4 text-lime-500" />
                </Button>
              </div>
              <div>€{item.subtotal.toFixed(3)}</div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleRemoveItem(item.productId)}
              >
                <Trash2 className="h-4  w-4 text-red-600" />
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="space-y-4 border border-gray-200 dark:border-gray-600 rounded-md p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Discount (%)
            </label>
            <Input
              type="number"
              value={cart.discount || ""}
              onChange={handleCartDiscount}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              <div className="flex items-center gap-2">
              <span>Shipping(€)</span>
               <Car className="h-4 w-4 text-lime-500"/>
              </div>
             
            </label>
            <Input
              type="number"
              value={cart.shipping || ""}
              onChange={handleShipping}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total Qty:</span>
            <span>{cart.totalQuantity}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Tax:</span>
            <span>€{cart.totalTax.toFixed(3)}</span>
          </div>
          <div className="flex justify-between">
            <span>Sub Total:</span>
            <span>€{cart.subtotal.toFixed(3)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>€{cart.total.toFixed(3)}</span>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <Button className="flex-1 bg-lime-500 hover:bg-lime-500/80"  onClick={() => setIsResetModalOpen(true)}>
            Reset (F4 / fn+F4)
          </Button>
          <Button
            className="flex-1 bg-lime-500 hover:bg-lime-500/80"
            onClick={() => setIsPaymentModalOpen(true)}
          >
            Pay Now  (F5 / fn+F5)
          </Button>
        </div>
      </div>

      <ResetModal open={isResetModalOpen} setIsResetModalOpen={setIsResetModalOpen} handleReset={handleReset} />
      
      <PaymentModal open={isPaymentModalOpen} setIsPaymentModalOpen={setIsPaymentModalOpen} cart={cart} receivedAmount={receivedAmount} handleReceivedAmountChange={handleReceivedAmountChange} dueAmount={dueAmount} changeReturn={changeReturn} handleReset={handleReset}/>
 
    </div>
  );
}
