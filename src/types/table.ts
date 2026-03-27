import { ColumnDef } from "@tanstack/react-table";

export interface TableFetchParams {
  page: number;
  limit: number;
  search?: string;
  order?: string;
}

export interface TableResponse<T> {
  data: T[];
  total: number;
}

export interface TanstackTableProps<T> {
  columns: ColumnDef<T, any>[];
  fetchData: (params: TableFetchParams) => Promise<TableResponse<T>>;
}