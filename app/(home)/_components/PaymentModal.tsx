"use client";
import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

  import { addPayment } from "@/utils/recentSalesIndexedDB";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import userData from "@/mockData/userData.json";
import { CartState } from '@/types';

interface PaymentModalProps {
    open: boolean;
    setIsPaymentModalOpen: (open: boolean) => void;
    cart: CartState;
    receivedAmount: string;
    handleReceivedAmountChange: (value: string) => void;
    dueAmount: string;
    changeReturn: string;
    handleReset: () => void;
}

const PaymentModal = ({open, setIsPaymentModalOpen, cart, receivedAmount, handleReceivedAmountChange, dueAmount, changeReturn, handleReset}: PaymentModalProps) => {

   
    const [paymentType, setPaymentType] = useState("Cash");
    const [paymentStatus, setPaymentStatus] = useState("Paid");
   
  return (
    
    <Dialog open={open} onOpenChange={setIsPaymentModalOpen}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Make Payment</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Received Amount:
            </label>
            <Input
              type="number"
              value={receivedAmount}
              onChange={(e) => handleReceivedAmountChange(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Due Amount:
            </label>
            <Input type="text" value={dueAmount} disabled />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Change Return:
            </label>
            <Input type="text" value={changeReturn} disabled />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Type:
            </label>
            <Select
              value={paymentType}
              onValueChange={(value) => setPaymentType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Status:
            </label>
            <Select
              value={paymentStatus}
              onValueChange={(value) => setPaymentStatus(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Due">Due</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Notes:</label>
            <Input type="text" placeholder="Enter notes..." />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Sales Date:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Products:</span>
            <span>{cart.totalQuantity}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Amount:</span>
            <span>€{cart.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount:</span>
            <span>{cart.discount.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>€{cart.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Grand Total:</span>
            <span>€{cart.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => setIsPaymentModalOpen(false)}
        >
          Cancel
        </Button>

        <Button
        className="bg-lime-500 hover:bg-lime-500/80"
          onClick={async () => {
            const randomUser =
              userData.users[
                Math.floor(Math.random() * userData.users.length)
              ];
            const paymentData = {
              reference: randomUser.referenceNo,
              customer: randomUser.name,
              warehouse: `10${randomUser.id}`,
              amount: receivedAmount,
              due: dueAmount,
              method: paymentType,
              status: parseFloat(dueAmount) > 0.000 ? "Due" : "Paid",
            };

            try {
              await addPayment(paymentData);
              console.log("Payment saved:", paymentData);
              setIsPaymentModalOpen(false);
              toast.success("Payment successful!");
              handleReset();
            } catch (error) {
              console.error("Error saving payment:", error);
              toast.error("Something went wrong!");
            }
          }}
        >
          Submit
        </Button>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default PaymentModal
