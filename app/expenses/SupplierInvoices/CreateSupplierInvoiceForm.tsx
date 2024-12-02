'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { createSupplierInvoice } from '@/app/expenses/actions';

export function CreateSupplierInvoiceForm() {
  const [open, setOpen] = useState(false);
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await createSupplierInvoice(formData);
      setOpen(false);
    } catch (error) {
      console.error('Failed to create invoice:', error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Expense
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Expense</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="supplier_name"
              placeholder="Supplier Name"
              required
            />
          </div>
          <div>
            <Input
              name="invoice_number"
              placeholder="Invoice Number"
              required
            />
          </div>
          <div>
            <Input
              name="amount"
              type="number"
              step="0.01"
              placeholder="Amount (excl. tax)"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Create Expense
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 