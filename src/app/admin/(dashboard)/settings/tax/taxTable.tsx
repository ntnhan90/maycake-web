'use client'
import TanstackTable from "@/components/table/TanstackTable"
import TanstackTableV2 from "@/components/table/TanstackTableV2"
import { SortingState } from "@tanstack/react-table";
import { taxColumns } from "./taxColumn"
import { useState, useEffect ,useMemo, useCallback} from "react"
import taxApiRequest from "@/apiRequests/taxApi";
import { TaxListResType } from "@/models/taxModel";
import { useDeleteTaxMutation } from "@/queries/useTax";

export default function TaxTable(){
    const [tableState, setTableState] = useState<{
        page: number
        limit: number
        totalPages: number
        sorting: SortingState
        search: string,
    }>({
        page: 1,
        limit: 10,
        totalPages: 1,
        sorting: [],
        search: "",
    })
    const [data, setData] = useState<TaxListResType | null>(null);
    const [loading, setLoading ] = useState(false);

    const fetchTax = useCallback(async () => {
        setLoading(true)

        const sortParam = tableState.sorting[0]
            ? `${tableState.sorting[0].id}:${tableState.sorting[0].desc ? "desc" : "asc"}`
            : undefined

        const query = { 
            page: tableState.page,
            limit: tableState.limit,
            q: tableState.search,
            order: sortParam,
        }

        try{
            const res = await taxApiRequest.list(query)
            setData(res.payload)
        }finally{
            setLoading(false)
        }

    }, [tableState])

    useEffect(() => {
        fetchTax();
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

    const { mutate: deleteTax ,isPending} = useDeleteTaxMutation()
    const handleDelete = useCallback((id: number) => {
        if(!confirm("Delete this tax?")) return
        deleteTax(id, {
            onSuccess: () => {
                fetchTax()
            }
        })

    }, [deleteTax,fetchTax])
    //const columns = useMemo(() => taxColumns(handleDelete), [])
    const columns = useMemo(
        () => taxColumns(handleDelete,isPending),
        [handleDelete,isPending]
    )

    return (
        <div className="row">
            <div className="card">
                <div className="card-body">
                    <TanstackTableV2
                    data={data?.data ?? []}
                    columns={columns}
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
        </div>
    )
}