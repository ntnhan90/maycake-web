import { PostResType } from "@/models/blog/postModel";
import DasherTippy from "@/components/common/DashTippy";
import Checkbox from "@/components/table/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";

export const postColumns: ColumnDef<PostResType>[] = [
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
        id: "tags",
        header: "Tags",
        cell: ({ row }) => {
            const tags = row.original.tags;

            if (!tags || tags.length === 0) {
                return <span className="text-muted"></span>;
            }

            return (
                <div className="flex gap-1 flex-wrap">
                    <span>
                        {tags.map(tag => tag.name).join(", ")}
                    </span>
                </div>
            );
        },
    },
    {
        id: "categories",
        header: "Category",
         cell: ({ row }) => {
            const tags = row.original.categories;

            if (!tags || tags.length === 0) {
                return <span className="text-muted"></span>;
            }

            return (
                <div className="flex gap-1 flex-wrap">
                    <span>
                        {tags.map(tag => tag.name).join(", ")}
                    </span>
                </div>
            );
        },
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
                        <Button href={`/admin/blog/posts/${id}`} variant="ghost btn-icon"
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