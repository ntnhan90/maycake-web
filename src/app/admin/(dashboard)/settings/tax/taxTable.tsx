'use client'
import TanstackTable from "@/components/table/TanstackTable"
import TanstackTableV2 from "@/components/table/TanstackTableV2"
import { SortingState } from "@tanstack/react-table";
import { taxColumns } from "./taxColumn"
import { useState, useEffect } from "react"
import taxApiRequest from "@/apiRequests/taxApi";
import { TaxListResType } from "@/models/taxModel";

export default function TaxTable(){
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
    const [data, setData] = useState<TaxListResType | null>(null);
    const [loading, setLoading ] = useState(false);

    const fetchTax= async () => {
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
            const res = await taxApiRequest.list(query)
            setData(res.payload);
        }finally{
            setLoading(false)
        }
    }

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
    return (
        <div className="row">
         
        </div>
    )
}