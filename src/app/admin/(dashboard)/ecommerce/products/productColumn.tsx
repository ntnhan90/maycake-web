import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import { ProductResType } from "@/models/product/productModel";
import DasherTippy from "@/components/common/DashTippy";
import Checkbox from "@/components/table/Checkbox";
import { mediaUrl } from "@/utils/lib";
const DEFAULT_IMAGE = '/img/placeholder.png';

export const productColumns: ColumnDef<ProductResType>[] =[
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
		accessorKey: "id",
		header: "Id",
	},
    {
		accessorKey: "image",
		header: "Image",
        cell:({row}) =>{
            const avatar = mediaUrl(row.original.image) || DEFAULT_IMAGE;
            return (
                <img
                src={avatar}
                alt="avatar"
                width={40}
                height={40}
            />
            )
        }
	},
    {
		accessorKey: "name",
		header: "Name",
	},
    {
		accessorKey: "price",
		header: "Price",
	},
    {
		accessorKey: "sku",
		header: "sku",
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
            const {id,slug} = info.row.original;
            return (
                <Fragment>
                    <DasherTippy content="View">
                        <Button href={`/product/${slug}`} variant="ghost btn-icon"
							size="sm" className="rounded-circle"
						>
							<IconEye size={16} />
						</Button>
                    </DasherTippy>
                    <DasherTippy content="Edit">
                        <Button href={`/admin/ecommerce/products/${id}`} variant="ghost btn-icon"
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