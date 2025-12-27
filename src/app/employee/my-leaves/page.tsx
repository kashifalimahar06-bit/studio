import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { MyLeavesTable } from "@/components/employee/my-leaves-table";

export default function MyLeavesPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 sm:p-6 border-b">
        <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-headline tracking-tight">My Leave History</h1>
              <p className="text-muted-foreground">A record of all your past and pending leave requests.</p>
            </div>
            <Button variant="outline">
                <Download className="mr-2" />
                Download as Excel
            </Button>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <MyLeavesTable />
      </main>
    </div>
  );
}
