"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { leaveTypes } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";
import { runFlow } from '@genkit-ai/next/client';
import { sendLeaveRequest, SendLeaveRequestInput } from '@/ai/flows/send-leave-request-flow';
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  leaveType: z.enum(leaveTypes, { required_error: "Please select a leave type." }),
  dateRange: z.object({
    from: z.date({ required_error: "Start date is required." }),
    to: z.date({ required_error: "End date is required." }),
  }),
  reason: z.string().min(10, { message: "Reason must be at least 10 characters." }).max(500, { message: "Reason must not exceed 500 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export function ApplyLeaveForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        reason: ""
    }
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FormValues) => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "You must be logged in to apply for leave."
        });
        return;
    }

    toast({
        title: "Submitting Request...",
        description: "Forwarding your leave request to management."
    });

    try {
        const input: SendLeaveRequestInput = {
            employeeName: user.name || 'Employee',
            employeeId: user.uid,
            leaveType: values.leaveType,
            startDate: format(values.dateRange.from, 'yyyy-MM-dd'),
            endDate: format(values.dateRange.to, 'yyyy-MM-dd'),
            reason: values.reason,
        };

        const result = await runFlow(sendLeaveRequest, input);

        toast({
            title: "Request Sent to WhatsApp",
            description: result.message,
        });
        form.reset({ reason: '' });

    } catch (error) {
        console.error("Error sending leave request:", error);
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "Could not send the leave request. Please try again."
        });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="leaveType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leave Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a leave type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {leaveTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Dates</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value?.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value?.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Provide a brief reason for your leave..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Request"}
        </Button>
      </form>
    </Form>
  );
}
