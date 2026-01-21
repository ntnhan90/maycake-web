import { BlogTagResType } from "@/models/blog/tagModel";
import { RoleResType } from "@/models/roleModel";
import DasherTippy from "@/components/common/DashTippy";
import Checkbox from "@/components/table/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";

export const roleColumns: ColumnDef<RoleResType>[] = [
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
		accessorKey: "description",
		header: "description",
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
                        <Button href={`/admin/systems/roles/${id}`} variant="ghost btn-icon"
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