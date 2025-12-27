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
  approved: z.boolean().describe('Whether the leave request was approved or not.'),
  remark: z.string().describe('Any remarks or comments provided by the manager.'),
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
  prompt: `You are an AI assistant tasked with processing management responses to leave requests.

  Analyze the following message to determine if the leave request was approved or rejected, and extract any remarks provided.
  Message: {{{message}}}

  Respond in the following JSON format:
  {
    "approved": true/false, // true if approved, false if rejected
    "remark": "Any remarks or comments provided by the manager. If no remarks were provided, leave empty."
  }`,
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
