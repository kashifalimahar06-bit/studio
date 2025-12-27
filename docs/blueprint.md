# **App Name**: Jeejal Amaan Leaves

## Core Features:

- Admin Authentication: Secure login for admin users using Firebase Authentication.
- Employee Authentication: Secure login for employee users using Firebase Authentication.
- Employee Management: Admin can add, edit, activate/deactivate, and delete employee records, including uploading profile pictures to Firebase Storage. Employee record upload via excel.
- Leave Application: Employees can submit leave requests with type, dates, and reason, saved in Firestore.
- WhatsApp Notification: Automatically send WhatsApp messages to management members when a leave request is submitted using Firebase Cloud Functions.
- Management Response Processing: Process management responses received via WhatsApp to update the leave status in Firestore using Firebase Cloud Functions; an AI tool filters and processes incoming messages.
- Leave Records and Visibility: Employees view their own leave records; admins view all records with approval, rejection, and remark options. Employee leave record can be downloaded via excel

## Style Guidelines:

- Primary color: Soft blue (#64B5F6) for a professional and calm feel.
- Background color: Light gray (#F5F5F5) for a clean and neutral backdrop.
- Accent color: Light green (#AED581) to indicate approval actions.
- Body and headline font: 'PT Sans', a modern yet warm sans-serif, will be used.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use simple and clear icons for leave types, status, and actions.
- Responsive design for both mobile and desktop, with separate dashboards for admin and employees.