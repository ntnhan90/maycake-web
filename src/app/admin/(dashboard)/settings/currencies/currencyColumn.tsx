import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import { CurrencyResType } from "@/models/currencyModel";
import DasherTippy from "@/components/common/DashTippy";
import Checkbox from "@/components/table/Checkbox";

export const currencyColumns : ColumnDef<CurrencyResType>[] = [
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
		accessorKey: "title",
		header: "Code",
	},
    {
		accessorKey: "exchange_rate",
		header: "exchange_rate",
        cell: ({ getValue }) => {
            const value = getValue<number>();
            return new Intl.NumberFormat("en-US").format(value || 0);
            //return new Intl.NumberFormat("vi-VN").format(value || 0);
        },
	},
    {
		accessorKey: "default",
		header: "Is default",
	},
    {
		accessorKey: "",
		header: "Action",
        cell: info => {
            const {id} = info.row.original;
            return (
                <Fragment>
                    <DasherTippy content="Edit">
                        <Button href={`/admin/settings/currencies/${id}`} variant="ghost btn-icon"
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