import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LeaveRequest } from "@/lib/types";
import { format } from "date-fns";

const mockMyLeaveRequests: LeaveRequest[] = [
    { id: "L1", employeeId: "employee-uid", employeeName: "Employee One", leaveType: "Annual", startDate: new Date("2024-08-10"), endDate: new Date("2024-08-12"), reason: "Family vacation.", status: "pending", createdAt: new Date() },
    { id: "L4", employeeId: "employee-uid", employeeName: "Employee One", leaveType: "Unpaid", startDate: new Date("2024-07-30"), endDate: new Date("2024-07-30"), reason: "Appointment.", status: "rejected", createdAt: new Date(), managerRemark: "Please provide documentation." },
    { id: "L5", employeeId: "employee-uid", employeeName: "Employee One", leaveType: "Sick", startDate: new Date("2024-06-15"), endDate: new Date("2024-06-15"), reason: "Flu.", status: "approved", createdAt: new Date(), managerRemark: "Hope you feel better." },
];

const statusBadgeVariant = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    approved: "bg-green-100 text-green-800 hover:bg-green-100",
    rejected: "bg-red-100 text-red-800 hover:bg-red-100",
};

export async function MyLeavesTable() {
  const leaves = mockMyLeaveRequests;

  return (
    <div className="rounded-lg border shadow-sm bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Leave Type</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Manager's Remark</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell className="font-medium">{leave.leaveType}</TableCell>
              <TableCell className="text-muted-foreground text-xs">
                {format(leave.startDate, "MMM d")} - {format(leave.endDate, "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-muted-foreground max-w-xs truncate">{leave.reason}</TableCell>
              <TableCell>
                <Badge className={statusBadgeVariant[leave.status]}>
                  {leave.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground italic">
                {leave.managerRemark || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
