import { LeavesTable } from "@/components/admin/leaves-table";
import { ProcessResponseForm } from "@/components/admin/process-response-form";

export default function AdminLeavesPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 sm:p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight">Leave Requests</h1>
          <p className="text-muted-foreground">Approve or reject leave requests from employees.</p>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
                <LeavesTable />
            </div>
            <div>
                <ProcessResponseForm />
            </div>
        </div>
      </main>
    </div>
  );
}
