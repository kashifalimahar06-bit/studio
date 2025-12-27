import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, HeartPulse, Hourglass } from "lucide-react";

const leaveStats = [
  { title: "Annual Leave Remaining", value: "15 Days", icon: Briefcase, color: "text-blue-500" },
  { title: "Sick Leave Taken", value: "3 Days", icon: HeartPulse, color: "text-orange-500" },
  { title: "Pending Requests", value: "1", icon: Hourglass, color: "text-yellow-500" },
];

export default function EmployeeDashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 sm:p-6">
        <h1 className="text-2xl font-bold font-headline tracking-tight">My Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your leave summary.</p>
      </header>
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {leaveStats.map((stat) => (
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
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Leave</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">You have no upcoming approved leaves.</p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
