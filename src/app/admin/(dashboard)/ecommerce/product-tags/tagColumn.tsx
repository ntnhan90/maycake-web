import { ProTagResType } from "@/models/product/tagModel";
import DasherTippy from "@/components/common/DashTippy";
import Checkbox from "@/components/table/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";

export const tagColumns: ColumnDef<ProTagResType>[] = [
    {
        id : "select",
        header: ({table}) =>{
            return(
                <Checkbox 
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler()
                }}
                />
            )
        },
        cell:({ row}) => (
            <div>
                <Checkbox 
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleExpandedHandler(),
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
            return(
                <Fragment>
                    <DasherTippy content="view">
                        <Button href="" variant="ghost btn-icon"
							size="sm" className="rounded-circle">
                            <IconEye size={16} />
                        </Button>
                    </DasherTippy>
                    <DasherTippy content="Edit">
                        <Button href={`/admin/ecommerce/product-tags/${id}`} variant="ghost btn-icon"
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
    }
]