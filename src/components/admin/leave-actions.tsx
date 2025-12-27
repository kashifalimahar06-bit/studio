"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LeaveRequest } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Check, Info, X } from "lucide-react";

interface LeaveActionsProps {
  leaveRequest: LeaveRequest;
}

export function LeaveActions({ leaveRequest }: LeaveActionsProps) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [remark, setRemark] = useState("");
  const { toast } = useToast();

  const handleActionClick = (selectedAction: "approve" | "reject") => {
    setAction(selectedAction);
    setOpen(true);
  };

  const handleSubmit = () => {
    // In a real app, you would update Firestore here.
    toast({
      title: `Leave ${action}d`,
      description: `Leave request for ${leaveRequest.employeeName} has been ${action}d.`,
    });
    setOpen(false);
    setRemark("");
  };

  if (leaveRequest.status !== "pending") {
    return (
      <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
                <Info className="h-4 w-4 mr-2"/>
                Details
            </Button>
        </DialogTrigger>
        <DialogContent>
             <DialogHeader>
                <DialogTitle>Leave Details</DialogTitle>
                <DialogDescription>
                    This leave request has already been processed.
                </DialogDescription>
             </DialogHeader>
             <div className="space-y-2">
                <p><span className="font-semibold">Status:</span> {leaveRequest.status}</p>
                <p><span className="font-semibold">Manager Remark:</span> {leaveRequest.managerRemark || 'N/A'}</p>
             </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <div className="flex gap-2 justify-end">
        <Button
          size="sm"
          variant="outline"
          className="bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 border-green-200"
          onClick={() => handleActionClick("approve")}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 border-red-200"
          onClick={() => handleActionClick("reject")}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === "approve" ? "Approve" : "Reject"} Leave Request
            </DialogTitle>
            <DialogDescription>
              You are about to {action} the leave request for {leaveRequest.employeeName}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="remark">Remark (Optional)</Label>
              <Textarea
                id="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Add a comment for the employee..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className={action === 'approve' ? 'bg-primary' : 'bg-destructive'}
            >
              Confirm {action === "approve" ? "Approval" : "Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
