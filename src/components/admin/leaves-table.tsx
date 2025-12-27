import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LeaveRequest } from "@/lib/types";
import { format } from "date-fns";
import { LeaveActions } from "./leave-actions";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const mockLeaveRequests: LeaveRequest[] = [
    { id: "L1", employeeId: "1", employeeName: "Alice Johnson", leaveType: "Annual", startDate: new Date("2024-08-10"), endDate: new Date("2024-08-12"), reason: "Family vacation.", status: "pending", createdAt: new Date(), employeeProfilePicture: PlaceHolderImages[0].imageUrl },
    { id: "L2", employeeId: "2", employeeName: "Bob Williams", leaveType: "Sick", startDate: new Date("2024-07-22"), endDate: new Date("2024-07-22"), reason: "Fever and headache.", status: "approved", createdAt: new Date(), employeeProfilePicture: PlaceHolderImages[1].imageUrl, managerRemark: "Get well soon." },
    { id: "L3", employeeId: "4", employeeName: "Diana Prince", leaveType: "Annual", startDate: new Date("2024-09-01"), endDate: new Date("2024-09-05"), reason: "Personal time off.", status: "pending", createdAt: new Date(), employeeProfilePicture: PlaceHolderImages[3].imageUrl },
    { id: "L4", employeeId: "1", employeeName: "Alice Johnson", leaveType: "Unpaid", startDate: new Date("2024-07-30"), endDate: new Date("2024-07-30"), reason: "Appointment.", status: "rejected", createdAt: new Date(), employeeProfilePicture: PlaceHolderImages[0].imageUrl, managerRemark: "Please provide documentation." },
];

const statusBadgeVariant = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    approved: "bg-green-100 text-green-800 hover:bg-green-100",
    rejected: "bg-red-100 text-red-800 hover:bg-red-100",
};


export async function LeavesTable() {
  const leaves = mockLeaveRequests;

  return (
    <div className="rounded-lg border shadow-sm bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={leave.employeeProfilePicture} alt={leave.employeeName} />
                        <AvatarFallback>{leave.employeeName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{leave.employeeName}</span>
                </div>
              </TableCell>
              <TableCell>{leave.leaveType}</TableCell>
              <TableCell className="text-muted-foreground text-xs">
                {format(leave.startDate, "MMM d, yyyy")} - {format(leave.endDate, "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <Badge className={statusBadgeVariant[leave.status]}>
                  {leave.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <LeaveActions leaveRequest={leave} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
