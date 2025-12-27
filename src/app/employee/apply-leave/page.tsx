import { ApplyLeaveForm } from "@/components/employee/apply-leave-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApplyLeavePage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 sm:p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight">Apply for Leave</h1>
          <p className="text-muted-foreground">Submit a new request for time off.</p>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>New Leave Request</CardTitle>
                    <CardDescription>Please fill out the details for your leave request.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ApplyLeaveForm />
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
