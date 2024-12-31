"use client";
import React from 'react'
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

interface ResetModalProps {
  open: boolean;
  setIsResetModalOpen: (open: boolean) => void;
  handleReset: () => void;
}

const ResetModal = ({open, setIsResetModalOpen, handleReset}: ResetModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setIsResetModalOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Are you absolutely sure you want to reset?
        </DialogTitle>
      </DialogHeader>
      <p>
        This action cannot be undone. This will permanently reset your added
        product data and remove your data from our total calculation.
      </p>
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => setIsResetModalOpen(false)}
        >
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default ResetModal
