import { createClient } from '@/utils/supabase/server';
import { getSupplierInvoices } from '@/utils/supabase/SupplierInvoices/queries';
import { CreateSupplierInvoiceForm } from './SupplierInvoices/CreateSupplierInvoiceForm';
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ExpensesPage() {
  const supabase = createClient();
  const expenses = await getSupplierInvoices(supabase);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl">Expenses</h2>
        <CreateSupplierInvoiceForm />
      </div>
      
      <Input 
        placeholder="Search expenses..." 
        className="w-64 mb-6"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense: any) => (
              <TableRow key={expense.id}>
                <TableCell>
                  {new Date(expense.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{expense.supplier_name}</TableCell>
                <TableCell>{expense.invoice_number}</TableCell>
                <TableCell className="text-right">
                  ${expense.amount.value_excl_tax}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
