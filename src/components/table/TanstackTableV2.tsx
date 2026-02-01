"use client";

import React, { Fragment } from "react";
import { Table } from "react-bootstrap";
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronUp, ChevronDown } from "react-feather";
import SearchInput from "../input/searchInput";
import { getPaginationPages } from "@/utils/lib";

/* =====================
   TYPES
===================== */

export type ServerTableState = {
    page: number;
    limit: number;
    totalPages: number;
    sorting?: SortingState;
    search?: string;
};

interface TanstackTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData, unknown>[];

    state: ServerTableState;

    onPageChange: (page: number) => void;
    onSortChange?: (sorting: SortingState) => void;
    onSearchChange?: (value: string) => void;

    /** UI */
    loading?: boolean;
    showSearch?: boolean;
    className?: string;
    tableClass?: string;
}

/* =====================
   COMPONENT
===================== */

function TanstackTableV2<TData>({
    data,
    columns,
    state,
    onPageChange,
    onSortChange,
    onSearchChange,
    loading = false,
    showSearch = true,
    className,
    tableClass,
}: TanstackTableProps<TData>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),

        /** server-side */
        manualPagination: true,
        manualSorting: true,
        pageCount: state.totalPages,

        state: {
            sorting: state.sorting,
            pagination: {
                pageIndex: state.page - 1,
                pageSize: state.limit,
            },
        },

        onSortingChange: (updater) => {
            if (!onSortChange) return;

            const nextSorting =
                typeof updater === "function"
                    ? updater(state.sorting ?? [])
                    : updater;

            onSortChange(nextSorting);
        },
    });

    return (
        <Fragment>
            {/* 🔍 SEARCH */}
            {showSearch && onSearchChange && (
                <SearchInput 
                    value={state.search ?? ""}
                    onChange={onSearchChange}
                    placeholder="Search... "
                />
            )}

            {/* 📊 TABLE */}
            <div className={className ?? "table-responsive"}>
                <Table
                    className={tableClass ?? "table table-centered"}
                    style={{ width: "100%" }}
                >
                    <thead className="bg-light">
                        {table.getHeaderGroups().map((hg) => (
                            <tr key={hg.id}>
                                {hg.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        style={{
                                            cursor: header.column.getCanSort()
                                                ? "pointer"
                                                : "default",
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: <ChevronUp size={14} />,
                                            desc: <ChevronDown size={14} />,
                                        }[
                                            header.column.getIsSorted() as string
                                        ] ?? null}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center py-4"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center py-4"
                                >
                                    No data
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>

            {state.totalPages > 1 && (
                <div className="d-flex justify-content-end align-items-center gap-1 mt-3">
                    <button
                        className="btn btn-out-line-secondary btn-sm"
                        disabled={ state.page <= 1 || loading }
                        onClick={ () => onPageChange(state.page -1 )}
                    >
                        Prev
                    </button>
                    {getPaginationPages(state.page, state.totalPages).map((p, idx) =>
                        p === "..." ? (
                            <span key={idx} className="px-2">
                                ...
                            </span>
                        ):(
                            <button
                                key={p}
                                disabled={loading}
                                onClick={() => onPageChange(p as number)}
                                className={`btn btn-sm ${
                                    p === state.page 
                                        ? "btn-primary"
                                        : "btn-outline-secondary"
                                }` }
                            >
                                {p}
                            </button>
                        )
                    )}

                    <button
                        className="btn btn-out-line-secondary btn-sm"
                        disabled={ state.page >= state.totalPages || loading}
                        onClick={ () => onPageChange(state.page + 1 )}
                    >
                        Next
                    </button>
                </div>
            ) }
        </Fragment>
    );
}

export default TanstackTableV2;
