import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.POSTGRES_URL}`);

// list invoices
 async function listInvoices() {
  // sql query to get a customer name for a given invoice amount
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
 }

export async function GET() {
 
   try {
   	return Response.json(await listInvoices());
   } catch (error) {
   	return Response.json({ error }, { status: 500 });
   }
}
