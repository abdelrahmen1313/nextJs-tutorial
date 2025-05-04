
import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomerById } from '@/app/lib/data';
 
export default async function Page(
    props:  { params: Promise<{ id: string }> },
) {


  const params = await props.params;
  const id = params.id;
  
  const [invoice, customer] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomerById(id)
  ]);
  console.log('Invoice:', invoice);
  console.log('Customer:', customer);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customer={customer} />
     
    </main>
  );
}