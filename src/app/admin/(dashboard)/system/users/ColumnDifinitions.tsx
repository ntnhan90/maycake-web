//import node module libraries
import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Badge, Button, Image } from "react-bootstrap";
import Link from "next/link";

//import custom types
import { UserType } from "@/types/UserType";

export const userListColumns: ColumnDef<UserType>[] = [
    {
		accessorKey: "category",
		header: "Category",
	},
]
