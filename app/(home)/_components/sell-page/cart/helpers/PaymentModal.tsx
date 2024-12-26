"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PaymentDetails } from "@/types/cart";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: PaymentDetails) => void;
  initialDetails: Omit<
    PaymentDetails,
    "receivedAmount" | "paymentType" | "notes"
  >;
}

export function PaymentModal({
  isOpen,
  onClose,
  onSubmit,
  initialDetails,
}: PaymentModalProps) {
  const [details, setDetails] = useState<PaymentDetails>({
    ...initialDetails,
    receivedAmount: initialDetails.payingAmount,
    paymentType: "cash",
    paymentStatus: "pending",
    dueAmount: 0,
    changeReturn: 0,
    notes: "",
  });

  useEffect(() => {
    if (details.receivedAmount < details.payingAmount) {
      setDetails((prev) => ({
        ...prev,
        dueAmount: details.payingAmount - details.receivedAmount,
        changeReturn: 0,
      }));
    } else {
      setDetails((prev) => ({
        ...prev,
        dueAmount: 0,
        changeReturn: details.receivedAmount - details.payingAmount,
      }));
    }
  }, [details.receivedAmount, details.payingAmount]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Make Payment</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Received Amount:</label>
              <Input
                type="number"
                value={details.receivedAmount}
                onChange={(e) =>
                  setDetails((prev) => ({
                    ...prev,
                    receivedAmount: Number(e.target.value),
                  }))
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Paying Amount:</label>
              <Input type="number" value={details.payingAmount} disabled />
            </div>

            <div>
              <label className="text-sm font-medium">Payment Type:</label>
              <Select
                value={details.paymentType}
                onValueChange={(value: "cash" | "due") =>
                  setDetails((prev) => ({ ...prev, paymentType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="due">Due</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Payment Status:</label>
              <Input value={details.paymentStatus} disabled />
            </div>

            <div>
              <label className="text-sm font-medium">Due Amount:</label>
              <Input value={details.dueAmount.toFixed(2)} disabled />
            </div>

            <div>
              <label className="text-sm font-medium">Change Return:</label>
              <Input value={details.changeReturn.toFixed(2)} disabled />
            </div>

            <div>
              <label className="text-sm font-medium">Notes:</label>
              <Textarea
                value={details.notes}
                onChange={(e) =>
                  setDetails((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                placeholder="Enter notes..."
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium">Sales Date:</span>
              <span>{details.salesDate}</span>

              <span className="font-medium">Total Products:</span>
              <span>{details.totalProducts}</span>

              <span className="font-medium">Total Amount:</span>
              <span>€{details.totalAmount.toFixed(2)}</span>

              <span className="font-medium">Discount:</span>
              <span>
                €{details.discount.toFixed(2)} (
                {((details.discount / details.totalAmount) * 100).toFixed(1)}%)
              </span>

              <span className="font-medium">Shipping:</span>
              <span>€{details.shipping.toFixed(2)}</span>

              <span className="font-medium">Grand Total:</span>
              <span>€{details.grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit(details)}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
