import { CustomerResType } from "@/models/product/customerModel";
import DasherTippy from "@/components/common/DashTippy";
import Checkbox from "@/components/table/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";

export const CustomerColumns: ColumnDef<CustomerResType>[] = [
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
        accessorKey: "id",
		header: "id",
    },
    {
		accessorKey: "name",
		header: "Name",
	},
    {
		accessorKey: "password",
		header: "password",
	},
    {
		accessorKey: "phone",
		header: "Phone",
	},
    {
        accessorKey: "status",
        header: "Status",
        cell:({cell}) =>{
            const value = cell.getValue() as "activated" | "locked";
            const colors = {
                activated: "bg-secondary",
                locked: "bg-success",
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
                        <Button href={`/admin/ecommerce/customers/${id}`} variant="ghost btn-icon"
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