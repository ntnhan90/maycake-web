'use client'
import {Card, CardHeader, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "react-bootstrap"
import Link from "next/link"
import TanstackTable from "@/components/table/TanstackTable"
import { useGetProductTagListQuery } from "@/queries/useProductTag"
import { tagColumns } from "./tagColumn"

export default function ProductTagTable(){
    const tagListQuery = useGetProductTagListQuery();
    const data = tagListQuery.data?.payload.data ?? [];

    return(
        <div className="row">
            <div className="col">
                <Card>
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
                </Card>
                <TanstackTable 
                    data={data}
                    columns={tagColumns}
                    pagination={true}        
                    isSortable
                />
            </div>
        </div>
    )
}