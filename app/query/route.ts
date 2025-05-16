import { neon } from '@neondatabase/serverless';
import { time } from 'console';

const sql = neon(`${process.env.POSTGRES_URL}`);

// list invoices
 async function listInvoices() {
  // sql query to get a customer name for a given invoice amount
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    
  `;

	return {...data, timestamp: new Date().toISOString()};
 }

export async function GET() {
 
   try {
   	let resp = Response.json(await listInvoices());
    
    return resp;
   } catch (error) {
   	return Response.json({ error }, { status: 500 });
   }
}
