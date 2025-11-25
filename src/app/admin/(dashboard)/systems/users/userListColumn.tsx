import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import Link from "next/link";

// types
import { AccountType} from "@/models/accountModel";
import DasherTippy from "@/components/common/DashTippy";
import Checkbox from "@/components/table/Checkbox";

export const userListColumns: ColumnDef<AccountType>[] =[
    {
        id: "select",
        header: ({table}) =>{
            return(
                <Checkbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
					onChange: table.getToggleAllRowsSelectedHandler(),
                }} />
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
		accessorKey: "username",
		header: "Username",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
    {
		accessorKey: "avatar_id",
		header: "Avatar",
	},
    {
		accessorKey: "isActive",
		header: "Status",
	},
    {
        accessorKey: "",
        header:"Action",
        cell: info => {
            const {id} = info.row.original; 
            return(
                <Fragment>
                    <DasherTippy content="View">
						<Button
							href=""
							variant="ghost btn-icon"
							size="sm"
							className="rounded-circle"
							>
							<IconEye size={16} />
						</Button>
					</DasherTippy>
                    <DasherTippy content="Edit">
                        <Button href={`/admin/systems/users/${id}`} variant="ghost btn-icon"
							size="sm"
							className="rounded-circle"> 
                            <IconEdit size={16} />
                        </Button>
                    </DasherTippy>
                    <DasherTippy content="Delete">
						<Button href=""
							variant="ghost btn-icon"
							size="sm"
							className="rounded-circle"
						>
							<IconTrash size={16} />
						</Button>
					</DasherTippy>
                </Fragment>
            )
        }
    }
]