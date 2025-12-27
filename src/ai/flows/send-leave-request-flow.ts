'use server';
/**
 * @fileOverview A flow to send a leave request to a manager via a simulated WhatsApp message.
 *
 * - sendLeaveRequest - A function that handles sending the leave request.
 * - SendLeaveRequestInput - The input type for the sendLeaveRequest function.
 * - SendLeaveRequestOutput - The return type for the sendLeaveRequest function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { v4 as uuidv4 } from 'uuid';

const SendLeaveRequestInputSchema = z.object({
  employeeName: z.string().describe('The name of the employee requesting leave.'),
  employeeId: z.string().describe("The employee's unique ID."),
  leaveType: z.string().describe('The type of leave being requested (e.g., Annual, Sick).'),
  startDate: z.string().describe('The start date of the leave in YYYY-MM-DD format.'),
  endDate: z.string().describe('The end date of the leave in YYYY-MM-DD format.'),
  reason: z.string().describe('The reason for the leave request.'),
});
export type SendLeaveRequestInput = z.infer<typeof SendLeaveRequestInputSchema>;

const SendLeaveRequestOutputSchema = z.object({
  success: z.boolean().describe('Whether the message was sent successfully.'),
  message: z.string().describe('A confirmation message.'),
  leaveId: z.string().describe('The unique ID generated for this leave request.'),
});
export type SendLeaveRequestOutput = z.infer<typeof SendLeaveRequestOutputSchema>;

export async function sendLeaveRequest(input: SendLeaveRequestInput): Promise<SendLeaveRequestOutput> {
  return sendLeaveRequestFlow(input);
}

const sendLeaveRequestFlow = ai.defineFlow(
  {
    name: 'sendLeaveRequestFlow',
    inputSchema: SendLeaveRequestInputSchema,
    outputSchema: SendLeaveRequestOutputSchema,
  },
  async (input) => {
    const leaveId = `L-${uuidv4().substring(0, 4)}`;
    const managerPhoneNumber = '92304122490';

    const messageBody = `New Leave Request (ID: ${leaveId})
Employee: ${input.employeeName}
Type: ${input.leaveType}
Dates: ${input.startDate} to ${input.endDate}
Reason: ${input.reason}

Reply with "approve ${leaveId}" or "reject ${leaveId} [reason]".`;

    // In a real application, this would call a WhatsApp API provider.
    // Here, we'll just log it to the console to simulate the action.
    console.log(`
      ===============================================================
      SIMULATING SENDING WHATSAPP MESSAGE
      ===============================================================
      TO: ${managerPhoneNumber}
      ---------------------------------------------------------------
      BODY:
      ${messageBody}
      ===============================================================
    `);
    
    // We would also save the pending leave request to Firestore here.

    return {
      success: true,
      message: `Leave request (ID: ${leaveId}) has been forwarded to management's WhatsApp for approval. You will be notified of the outcome.`,
      leaveId: leaveId,
    };
  }
);
