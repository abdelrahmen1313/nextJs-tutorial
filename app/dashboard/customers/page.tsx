import React from 'react'

import CustomersTable from '@/app/ui/customers/table';
import { fetchAllCustomersWithConstraints } from '@/app/lib/data';

const Customers = async() => {
  const customers = await  fetchAllCustomersWithConstraints();
  console.log(customers)
 
  return (
    <div>
      <CustomersTable customers={customers} />
    </div>
  )
}

export default Customers