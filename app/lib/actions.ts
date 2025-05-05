'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { neon } from '@neondatabase/serverless';

// Database configuration
const sql = neon(process.env.POSTGRES_URL!);




// **************************   INVOICE ACTIONS   **************************
// Schema definitions
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

const InvoiceSchema = FormSchema.omit({ id: true, date: true });

// Utility functions
let parseFormData = (formData: FormData) => {
    try {
        let { customerId, amount, status } = InvoiceSchema.parse({
            customerId: formData.get('customerId'),
            amount: formData.get('amount'),
            status: formData.get('status'),
        });
        return { customerId, amount: amount * 100, status };
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.errors);
        }
        throw error;
    }
};

const handleInvoiceRedirect = () => {
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
};

const InvoiceActions = {

    async createInvoice(formData: FormData) {
        const { customerId, amount, status } = parseFormData(formData);
        const date = new Date().toISOString().split('T')[0];

        await sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId}, ${amount}, ${status}, ${date})
        `;

        handleInvoiceRedirect();
    },

    async updateInvoice(id: string, formData: FormData) {
         // Validate ID
         if (!id) {
            throw new Error('Valid invoice ID is required');
        }

        // Parse and validate form data
        const { customerId, amount, status } = parseFormData(formData);
        // Convert amount to cents and ensure proper UUID format
        const amountInCents = amount * 100;
      
        try {
     
      
            // Execute update with proper parameter handling
            await sql`
                UPDATE invoices
                SET 
                    customer_id = ${customerId},
                    amount = ${amountInCents},
                    status = ${status}
                WHERE id = ${id}
            `;

            handleInvoiceRedirect();
        } catch (error) {
            console.error('Error updating invoice:', error);
            throw error;
        }
    },

    async deleteInvoice(id: string) {
        await sql`
          DELETE FROM invoices
          WHERE id = ${id}
        `;

        handleInvoiceRedirect();
    }
}


export const { createInvoice, updateInvoice, deleteInvoice } = InvoiceActions;

