import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { EmployeesTable } from "@/components/admin/employees-table";

export default function AdminEmployeesPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 sm:p-6 border-b">
        <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-headline tracking-tight">Employee Management</h1>
              <p className="text-muted-foreground">Add, edit, and manage employee records.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="mr-2" />
                Upload Excel
              </Button>
              <Button>
                <Plus className="mr-2" />
                Add Employee
              </Button>
            </div>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <EmployeesTable />
      </main>
    </div>
  );
}
