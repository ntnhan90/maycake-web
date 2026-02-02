'use client'
import TanstackTable from "@/components/table/TanstackTable"
import TanstackTableV2 from "@/components/table/TanstackTableV2"
import { SortingState } from "@tanstack/react-table"
import { contactColumns } from "./contactColumn"
import { useState, useEffect } from "react"
import contactApiRequest from "@/apiRequests/contactApi"
import { ContactListResType } from "@/models/contactModel"
export default function ContactTable(){
    const [tableState, setTableState] = useState<{
        page: number
        limit: number
        totalPages: number
        sorting: SortingState
        search: string
    }>({
        page: 1,
        limit: 10,
        totalPages: 1,
        sorting: [],
        search: "",
    })
    const [data, setData] = useState<ContactListResType | null>(null);
    const [loading, setLoading ] = useState(false);

    const fetchContacts = async () => {
        setLoading(true);
        const sortParam = tableState.sorting[0]
            ? `${tableState.sorting[0].id}:${tableState.sorting[0].desc ? "desc" : "asc"}`
            : undefined;

        const query = { 
            page: tableState.page,
            limit: tableState.limit,
            q: tableState.search,
            order: sortParam,
        }
        try{
            const res = await contactApiRequest.list(query)
            setData(res.payload);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContacts();
    }, [
        tableState.page,
        tableState.limit,
        tableState.search,
        tableState.sorting,
    ]);

    useEffect(() => {
        if (data?.pagination) {
            setTableState((prev) => ({
                ...prev,
             //   limit: data.pagination.limit,
                totalPages: data.pagination.totalPages,
            }));
        }
    }, [data]);

    return (
        <div className="row">
            <div className="card-body">
                    <TanstackTableV2
                    data={data?.data ?? []}
                    columns={contactColumns}
                    loading={loading}
                    state={tableState}
                    showSearch
                    onPageChange={(page) =>
                        setTableState((s) => ({ ...s, page }))
                    }
                    onSearchChange={(search) =>
                        setTableState((s) => ({ ...s, page: 1, search }))
                    }
                    onSortChange={(sorting) =>
                        setTableState((s) => ({ ...s, page: 1, sorting }))
                    }
                    />
                </div>
        </div>
    )
}