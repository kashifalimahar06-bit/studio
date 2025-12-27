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
import { Employee } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { EmployeeActions } from "./employee-actions";

const mockEmployees: Employee[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "active", role: "employee", profilePictureUrl: PlaceHolderImages[0].imageUrl },
  { id: "2", name: "Bob Williams", email: "bob@example.com", status: "active", role: "employee", profilePictureUrl: PlaceHolderImages[1].imageUrl },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", status: "inactive", role: "employee", profilePictureUrl: PlaceHolderImages[2].imageUrl },
  { id: "4", name: "Diana Prince", email: "diana@example.com", status: "active", role: "employee", profilePictureUrl: PlaceHolderImages[3].imageUrl },
  { id: "5", name: "Ethan Hunt", email: "ethan@example.com", status: "inactive", role: "employee", profilePictureUrl: PlaceHolderImages[4].imageUrl },
];

export async function EmployeesTable() {
  // In a real app, you would fetch this data from Firestore
  const employees = mockEmployees;

  return (
    <div className="rounded-lg border shadow-sm bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={employee.profilePictureUrl} alt={employee.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell className="text-muted-foreground">{employee.email}</TableCell>
              <TableCell>
                <Badge variant={employee.status === "active" ? "default" : "secondary"} className={employee.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                  {employee.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <EmployeeActions employee={employee} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
