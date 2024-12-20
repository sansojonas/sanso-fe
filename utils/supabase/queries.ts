import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = cache(async (supabase: SupabaseClient) => {
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  return subscription;
});

export const getProducts = cache(async (supabase: SupabaseClient) => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'prices' });

  return products;
});

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();
  return userDetails;
});

export interface SupplierInvoice {
  id: string;
  created_at: string;
  supplier_name: string;
  invoice_number: string;
  amount: {
    value_excl_tax: number;
    // Add other amount fields if needed
  };
  // Add other fields as per your schema
}

// Read - Get all supplier invoices (you already have this)
export async function getSupplierInvoices(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('supplier_invoices')
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
    .from('supplier_invoices')
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
    .from('supplier_invoices')
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
    .from('supplier_invoices')
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
    .from('supplier_invoices')
    .select('*')
    .or(`supplier_name.ilike.%${searchTerm}%,invoice_number.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}
