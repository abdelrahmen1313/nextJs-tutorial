import {fetchFilteredCustomers, fetchCustomersPages} from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import Pagination from "@/app/ui/invoices/pagination";
import {Metadata} from "next";

export const metadata : Metadata = {
    title: "Customers"
};

export default async function Page(props : {
    searchParams
        ?
        : Promise < {
            query?: string,
            page?: string
        } >;
}) {
    const searchParams = await props.searchParams;

    const query = searchParams
        ?.query || '';
    const currentPage = Number(searchParams
        ?.page) || 1;

    const [customers,
        totalPages] = await Promise.all([
        fetchFilteredCustomers(query, currentPage),
        fetchCustomersPages(query)
    ]);

    return (
        <div className="w-full">
            <CustomersTable customers={customers}/>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    );
}
