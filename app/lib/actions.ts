'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { neon } from '@neondatabase/serverless';

//import postgres from 'postgres';

// Database configuration
const sql = neon(process.env.POSTGRES_URL!);




// **************************   INVOICE ACTIONS   **************************
// Schema definitions
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const InvoiceSchema = FormSchema.omit({ id: true, date: true });



// Utility functions
const parseFormData = (formData: FormData) => {
    try {
        const { customerId, amount, status } = InvoiceSchema.parse({
            customerId: formData.get('customerId'),
            amount: formData.get('amount'),
            status: formData.get('status'),
        });
        return { customerId, amount, status };
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

        // const amountInCents = amount * 100;
        const date = new Date().toISOString().split('T')[0];


        try {
            await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amount * 100}, 
            ${status}, ${date})
          `;
        } catch (error) {
            console.error('DBError @ creating invoice:', error);
            throw error;
        }


        handleInvoiceRedirect();
    },

    async updateInvoice(id: string, formData: FormData) {
        // Validate ID
        if (!id) {
            throw new Error('Valid invoice ID is required');
        }

        // Parse and validate form data
        const { customerId, amount, status } = parseFormData(formData);
        const amountInCents = amount * 100;

        await sql`
                UPDATE invoices
                SET customer_id = ${customerId},
                 amount = ${amountInCents},
                  status = ${status}
               
                WHERE id = ${id}
            `

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

/************** LOGGER **************/

import { errorLogData } from '@/app/lib/definitions';

export async function postLog(context: string, error: Error) {
    // Convert Error object to a serializable format--


    try {
        await sql` 
            INSERT INTO logs (error_data, context)
            VALUES (${JSON.stringify(error)}::jsonb, ${context})
        `;
    } catch (dbError) {
        console.error('Failed to log error:', dbError);
        throw dbError;
    }
}


export async function getLogs(): Promise<errorLogData[]> {
    try {
        const logs = (await sql
            `
         SELECT 
                   (id,
                    error_data::jsonb,
                    context
                    ) as error_data_log
                FROM logs
        `
        ) as errorLogData[];
        return logs;

    } catch (error) {
        console.error('Error fetching logs:', error);
        throw error;
    }

}

/************** AUTH ************** */

import { signIn } from '../auth';
import { AuthError } from 'next-auth';


 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
        
      return error.message;
    } else {
        console.error('Error authenticating:', error);
        throw error;
      
      }
    }
 
  }


