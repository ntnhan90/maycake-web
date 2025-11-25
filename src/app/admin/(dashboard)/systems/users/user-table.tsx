'use client'
import {Card, CardHeader, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "react-bootstrap"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { handleErrorApi } from "@/utils/lib"
import { AccountResType } from "@/models/accountModel"
import TanstackTable from "@/components/table/TanstackTable"
import { userListColumns } from "./userListColumn"
import { useGetAccountList } from "@/queries/useAccount"

export const userListData: AccountResType[] = [
    {
        id: 1,
        username: "ntnhan90",
        email: "ntnhan90@gmail.com",
        //role: z.enum([Role.Admin, Role.Franchise, Role.Store]),
        avatar_id: "1",
        isActive: 1
    },
    {
        id: 1,
        username: "ntnhan90",
        email: "ntnhan90@gmail.com",
        //role: z.enum([Role.Admin, Role.Franchise, Role.Store]),
        avatar_id: "1",
        isActive: 1
    },
];


export default function UserTable(){
    const accountListQuery = useGetAccountList()
    const data = accountListQuery.data?.payload.data ?? []
    
    return(
        <div className="row">
            <div className="col">
                <Card id="userList">
                    <CardHeader className='border-bottom-0'>
                        <div className="g-4 row">
                            <div className='col-md-4'>
                                <input placeholder='Search' className="form-control" type="text" />
                            </div>
                            <div className='col-md-8 d-flex justify-content-end'>
                                <Button variant="dark" className='rounded-2 '> Filter </Button>
                                <Dropdown>
                                    <DropdownToggle as={Button} variant="primary" className="rounded-2 ms-2" >
                                        Export
                                    </DropdownToggle>
                                    <DropdownMenu className="pt-0">
                                        <Link href="#" passHref legacyBehavior>
                                            <DropdownItem>
                                                Download as CSV
                                            </DropdownItem>
                                        </Link>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </CardHeader>
                    {/* Product List Table */}
					<TanstackTable
						data={data}
						columns={userListColumns}
						pagination={true}
						isSortable
					/>

                </Card>
            </div>
        </div>
    )
}