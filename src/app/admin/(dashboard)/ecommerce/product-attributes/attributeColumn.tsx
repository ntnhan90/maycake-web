import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { ProAttributeResType } from "@/models/product/attributeModel";
import DasherTippy from "@/components/common/DashTippy";
import Checkbox from "@/components/table/Checkbox";

export const attributeColumns: ColumnDef<ProAttributeResType>[] =[
    {
        id: "select",
        header:({table}) =>{
            return(
                <Checkbox 
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
                />
            );
        },
        cell:({row}) =>(
            <div>
                <Checkbox 
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
                />
            </div>
        )
    },
    {
		accessorKey: "name",
		header: "Name",
	},
    {
		accessorKey: "status",
		header: "Status",
        cell:({cell}) =>{
            const value = cell.getValue() as "pending" | "published" | "draft";

            const colors = {
                pending: "bg-secondary",
                published: "bg-success",
                draft: "bg-warning",
            };

            return (
                <span className={`badge text-capitalize text-success-fg ${colors[value]}`}>
                {value}
                </span>
            );
        }
	},
    {
		accessorKey: "",
		header: "Action",
        cell: info => {
            const {id} = info.row.original;
            return (
                <Fragment>
                    <DasherTippy content="View">
                        <Button href="" variant="ghost btn-icon"
							size="sm" className="rounded-circle"
						>
							<IconEye size={16} />
						</Button>
                    </DasherTippy>
                    <DasherTippy content="Edit">
                        <Button href={`/admin/settings/tax/${id}`} variant="ghost btn-icon"
							size="sm" className="rounded-circle"
                        > 
                            <IconEdit size={16} />
                        </Button>
                    </DasherTippy>
                    <DasherTippy content="Delete">
						<Button href="" variant="ghost btn-icon"
							size="sm" className="rounded-circle"
						>
							<IconTrash size={16} />
						</Button>
					</DasherTippy>
                </Fragment>
            )

        }
	},
]