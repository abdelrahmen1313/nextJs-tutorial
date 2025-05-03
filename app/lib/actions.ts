'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

// Database configuration
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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
const parseFormData = (formData: FormData) => {
    const { customerId, amount, status } = InvoiceSchema.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    return { customerId, amount: amount * 100, status };
};

const handleInvoiceRedirect = () => {
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
};

// INVOICE ACTIONS****************************************************
// These actions are used to create, update, and delete invoices in the database.
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
        const { customerId, amount, status } = parseFormData(formData);

        await sql`
          UPDATE invoices
          SET customer_id = ${customerId}, amount = ${amount}, status = ${status}
          WHERE id = ${id}
        `;

        handleInvoiceRedirect();
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

