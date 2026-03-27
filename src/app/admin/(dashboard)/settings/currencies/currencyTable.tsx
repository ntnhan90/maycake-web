'use client'
import TanstackTableV2 from "@/components/table/TanstackTableV2";
import { SortingState } from "@tanstack/react-table";
import { currencyColumns } from "./currencyColumn"
import { useState, useEffect } from "react"
import currencyApiRequest from "@/apiRequests/currencyApi";
import { CurrencyListResType } from "@/models/currencyModel"



export default function CurrencyTable(){
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
    const [data, setData] = useState<CurrencyListResType | null>(null);
    const [loading, setLoading ] = useState(false);

    const fetchCurrency = async () => {
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
            const res = await currencyApiRequest.list(query)
            setData(res.payload);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCurrency();
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

    const handleExportData = async () => {
        const sortParam = tableState.sorting[0]
            ? `${tableState.sorting[0].id}:${tableState.sorting[0].desc ? "desc" : "asc"}`
            : undefined;

        const res = await currencyApiRequest.list({
            page: 1,
            limit: 10000, // ⚠️ lấy full data
            q: tableState.search,
            order: sortParam,
        });

        return res.payload.data;
    };

    return (
        <div className="row">
            <div className="card">
                <div className="card-body">
                    <TanstackTableV2
                    data={data?.data ?? []}
                    columns={currencyColumns}
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
                    enableExport
                    onExport={handleExportData}
                    />
                </div>
            </div>
        </div>
    )
}