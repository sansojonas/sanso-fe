import { createClient } from '@/utils/supabase/server';
import { Input } from "@/components/ui/input_new";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { getSupplierInvoices } from '@/utils/supabase/queries';

export default async function ExpensesPage() {
  const supabase = createClient();
  const expenses = await getSupplierInvoices(supabase);
  console.log(expenses)

  return (
    <div className="h-full p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">
          Expenses
        </h2>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search expenses..."
          className="pl-8 bg-white"
        />
      </div>

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
