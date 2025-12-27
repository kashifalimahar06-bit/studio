'use server';

/**
 * @fileOverview Processes management responses received via WhatsApp to update leave status in Firestore.
 *
 * - processManagementResponse - A function that processes the management response and updates the leave status.
 * - ProcessManagementResponseInput - The input type for the processManagementResponse function.
 * - ProcessManagementResponseOutput - The return type for the processManagementResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessManagementResponseInputSchema = z.object({
  message: z.string().describe('The content of the message received via WhatsApp.'),
  leaveId: z.string().describe('The ID of the leave request to be updated.'),
});
export type ProcessManagementResponseInput = z.infer<typeof ProcessManagementResponseInputSchema>;

const ProcessManagementResponseOutputSchema = z.object({
  approved: z.boolean().describe('Whether the leave request was approved or not. This should be a simple true or false. Infer the result from the manager\'s message.'),
  remark: z.string().describe('Any remarks or comments provided by the manager. Extract this from the message. If no remarks were provided, leave it empty.'),
});
export type ProcessManagementResponseOutput = z.infer<typeof ProcessManagementResponseOutputSchema>;

export async function processManagementResponse(
  input: ProcessManagementResponseInput
): Promise<ProcessManagementResponseOutput> {
  return processManagementResponseFlow(input);
}

const processManagementResponsePrompt = ai.definePrompt({
  name: 'processManagementResponsePrompt',
  input: {schema: ProcessManagementResponseInputSchema},
  output: {schema: ProcessManagementResponseOutputSchema},
  prompt: `You are an AI assistant for a leave management system. Your task is to analyze a WhatsApp message from a manager and determine if a leave request is approved or rejected.

Analyze the following message, which is a reply to a leave request with ID '{{{leaveId}}}':
Manager's Message: "{{{message}}}"

Based on the message, determine the leave status. The 'approved' field must be either true (for approved) or false (for rejected). Also, extract any additional comments from the manager as a 'remark'.

Examples:
- "Yes, approved. Let me know if they need anything." -> { "approved": true, "remark": "Let me know if they need anything." }
- "No, this is not a good time." -> { "approved": false, "remark": "This is not a good time." }
- "ok" -> { "approved": true, "remark": "" }
- "reject" -> { "approved": false, "remark": "" }
`,
});

const processManagementResponseFlow = ai.defineFlow(
  {
    name: 'processManagementResponseFlow',
    inputSchema: ProcessManagementResponseInputSchema,
    outputSchema: ProcessManagementResponseOutputSchema,
  },
  async input => {
    const {output} = await processManagementResponsePrompt(input);
    return output!;
  }
);
