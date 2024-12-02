import { SupabaseClient } from '@supabase/supabase-js';
import { SupplierInvoice } from './types';

// Read - Get all supplier invoices
export async function getSupplierInvoices(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('SupplierInvoices')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

// Create - Add new supplier invoice
export async function createSupplierInvoice(
  supabase: SupabaseClient,
  invoice: Omit<SupplierInvoice, 'id' | 'created_at'>
) {
  const { data, error } = await supabase
    .from('SupplierInvoices')
    .insert([invoice])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Update - Modify existing supplier invoice
export async function updateSupplierInvoice(
  supabase: SupabaseClient,
  id: string,
  updates: Partial<SupplierInvoice>
) {
  const { data, error } = await supabase
    .from('SupplierInvoices')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Delete - Remove supplier invoice
export async function deleteSupplierInvoice(
  supabase: SupabaseClient,
  id: string
) {
  const { error } = await supabase
    .from('SupplierInvoices')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return true;
}

// Search - Search supplier invoices
export async function searchSupplierInvoices(
  supabase: SupabaseClient,
  searchTerm: string
) {
  const { data, error } = await supabase
    .from('SupplierInvoices')
    .select('*')
    .or(`supplier_name.ilike.%${searchTerm}%,invoice_number.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
} 