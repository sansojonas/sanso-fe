'use server'

import { createClient } from '@/utils/supabase/server';
import { createSupplierInvoice as createSupplierInvoiceQuery } from '@/utils/supabase/SupplierInvoices/queries';
import { revalidatePath } from 'next/cache';

export async function createSupplierInvoice(formData: FormData) {
  const supabase = createClient();
  
  const invoice = {
    supplier_name: formData.get('supplier_name') as string,
    invoice_number: formData.get('invoice_number') as string,
    amount: {
      value_excl_tax: parseFloat(formData.get('amount') as string),
      currency: 'USD'
    },
    organization_id: 3
  };

  await createSupplierInvoiceQuery(supabase, invoice);
  revalidatePath('/expenses');
} 