import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, CheckCircle, XCircle } from "lucide-react";

const stats = [
  { title: "Total Employees", value: 12, icon: Users, color: "text-blue-500" },
  { title: "Pending Leaves", value: 3, icon: Mail, color: "text-yellow-500" },
  { title: "Approved Leaves", value: 28, icon: CheckCircle, color: "text-green-500" },
  { title: "Rejected Leaves", value: 5, icon: XCircle, color: "text-red-500" },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 sm:p-6">
        <h1 className="text-2xl font-bold font-headline tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of leave management system.</p>
      </header>
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No recent activity to display.</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No quick links available.</p>
              </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
