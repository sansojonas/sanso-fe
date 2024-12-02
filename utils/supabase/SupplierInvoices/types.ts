export interface SupplierInvoice {
  id: string;
  created_at: string;
  supplier_name: string;
  invoice_number: string;
  amount: {
    value_excl_tax: number;
  };
} 