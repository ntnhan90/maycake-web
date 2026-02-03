import DasherTippy from "@/components/common/DashTippy";
import Checkbox from "@/components/table/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";
import { OrderResType } from "@/models/product/orderModel";

export const orderColumns: ColumnDef<OrderResType>[] = [
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
		accessorKey: "email",
		header: "Email",
        cell:({row}) =>{
            const { name, email, phone } = row.original
            return (
                <div className="d-flex flex-column">
                    <span className="fw-semibold">{name}</span>
                    <a href={`mailto:${email}`} className="text-primary small">
                        {email}
                    </a>
                    <span className="text-muted small">{phone}</span>
                </div>
            )
        }
	},
    {
		accessorKey: "total_amount",
		header: "Amount",
	},
    {
		accessorKey: "payment_method",
		header: "Payment Method",
	},
    {
		accessorKey: "payment_status",
		header: "Payment Status",
        cell:({cell}) =>{
            const value = cell.getValue() as "completed" | "pending" | "failed" ;
            const colors = {
                pending: "bg-secondary",
                completed: "bg-success",
                failed: "bg-warning",
            };
            return (
                <span className={`badge text-capitalize text-success-fg ${colors[value]}`}>
                {value}
                </span>
            );
        }
	},
    {
		accessorKey: "tax_amount",
		header: "Tax Amount",
	},
    {
		accessorKey: "shipping_amount",
		header: "Shipping Amount",
	},
    {
        accessorKey: "status",
        header: "Status",
        cell:({cell}) =>{
            const value = cell.getValue() as "completed" | "pending" | "cancelled" ;
            const colors = {
                pending: "bg-secondary",
                completed: "bg-success",
                cancelled: "bg-danger",
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
                        <Button href="" variant="ghost btn-icon"
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