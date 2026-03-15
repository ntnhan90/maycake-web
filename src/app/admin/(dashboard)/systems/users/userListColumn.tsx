import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import { mediaUrl } from "@/utils/lib";
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
		header: "email",
	},
    {
		accessorKey: "avatar",
		header: "Avatar",
        cell: ({ row }) => {
            const avatar = mediaUrl(row.original.avatar) || "/img/team/avatar.jpg";

            return (
            <img
                src={avatar}
                alt="avatar"
                width={40}
                height={40}
                style={{
                objectFit: "cover",
                borderRadius: "50%",
                }}
            />
            );
        },
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