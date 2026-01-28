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

export type ServerTableState = {
    page:number;
    limit:number;
    totalPages:number;
    sorting? : SortingState;
    search?:string;
}

interface TanstackTableProps<TData>{
    
}