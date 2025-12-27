"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { runFlow } from '@genkit-ai/next/client';
import { processManagementResponse, ProcessManagementResponseInput } from '@/ai/flows/process-management-response';

const formSchema = z.object({
  leaveId: z.string().min(1, { message: "Leave ID is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export function ProcessResponseForm() {
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            leaveId: "L1",
            message: "Yes, approved. Let me know if they need anything.",
        },
    });

    const { isSubmitting } = form.formState;

    const onSubmit = async (values: FormValues) => {
        toast({
            title: "Processing Response...",
            description: "The AI is analyzing the message.",
        });

        try {
            const input: ProcessManagementResponseInput = {
                leaveId: values.leaveId,
                message: values.message,
            };

            const result = await runFlow(processManagementResponse, input);
            
            // In a real app, you would use this result to update Firestore.
            // e.g., updateLeaveStatus(result.leaveId, result.approved, result.remark);

            toast({
                title: "Processing Complete",
                description: `Leave ${result.approved ? 'Approved' : 'Rejected'}. Remark: "${result.remark}"`,
            });
            form.reset();

        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "AI Processing Failed",
                description: "Could not process the management response.",
            });
        }
    };

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Wand2 className="text-primary" />
                    Process WhatsApp Response
                </CardTitle>
                <CardDescription>
                    Paste a manager's response to a leave request to have AI update the status.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="leaveId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Leave ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., L1, L2, L3" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Manager's Message</FormLabel>
                                    <FormControl>
                                        <Textarea rows={4} placeholder="Paste WhatsApp message here..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="animate-spin" /> : "Process with AI"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
