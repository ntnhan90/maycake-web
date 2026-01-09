'use client'
import {Card, CardHeader, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "react-bootstrap"
import Link from "next/link"
import TanstackTable from "@/components/table/TanstackTable"
import { useGetFaqsListQuery } from "@/queries/useFaqs"
import { orderColumns } from "./orderColums"
import { OrderResType } from "@/models/product/orderModel"

export const paymentMockData: OrderResType[] = [
  {
    id: 20,
    name: 'Dr. Reuben Halvorson',
    email: 'nicolas.pollich@example.com',
    phone: '+17329631822',
    amount: 4694.3,
    payment_method: 'Payment with SSLCommerz',
    payment_status: 'completed',
    status: 'completed',
    tax_amount: 314.3,
    shipping_amount: 0,
  },
  {
    id: 21,
    name: 'Anna Thompson',
    email: 'anna.thompson@example.com',
    phone: '+14155552671',
    amount: 1299.99,
    payment_method: 'Payment with Stripe',
    payment_status: 'completed',
    status: 'completed',
    tax_amount: 89.99,
    shipping_amount: 15,
  },
  {
    id: 22,
    name: 'Michael Scott',
    email: 'michael.scott@example.com',
    phone: '+12025550123',
    amount: 899.5,
    payment_method: 'Payment with PayPal',
    payment_status: 'pending',
    status: 'pending',
    tax_amount: 60.5,
    shipping_amount: 10,
  },
  {
    id: 23,
    name: 'Sarah Connor',
    email: 'sarah.connor@example.com',
    phone: '+447911123456',
    amount: 2450,
    payment_method: 'Payment with SSLCommerz',
    payment_status: 'completed',
    status: 'completed',
    tax_amount: 170,
    shipping_amount: 0,
  },
  {
    id: 24,
    name: 'John Wick',
    email: 'john.wick@example.com',
    phone: '+4915112345678',
    amount: 3200,
    payment_method: 'Payment with Stripe',
    payment_status: 'failed',
    status: 'cancelled',
    tax_amount: 0,
    shipping_amount: 0,
  },
  {
    id: 25,
    name: 'Emily Carter',
    email: 'emily.carter@example.com',
    phone: '+33612345678',
    amount: 560.75,
    payment_method: 'Payment with PayPal',
    payment_status: 'completed',
    status: 'pending',
    tax_amount: 40.75,
    shipping_amount: 5,
  },
  {
    id: 26,
    name: 'David Beckham',
    email: 'david.beckham@example.com',
    phone: '+447700900123',
    amount: 7800,
    payment_method: 'Payment with Bank Transfer',
    payment_status: 'pending',
    status: 'pending',
    tax_amount: 520,
    shipping_amount: 25,
  },
  {
    id: 27,
    name: 'Lisa Wong',
    email: 'lisa.wong@example.com',
    phone: '+85291234567',
    amount: 1120,
    payment_method: 'Payment with Stripe',
    payment_status: 'completed',
    status: 'completed',
    tax_amount: 80,
    shipping_amount: 0,
  },
  {
    id: 28,
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@example.com',
    phone: '+5215512345678',
    amount: 2150,
    payment_method: 'Payment with PayPal',
    payment_status: 'completed',
    status: 'completed',
    tax_amount: 150,
    shipping_amount: 20,
  },
  {
    id: 29,
    name: 'Nguyen Van An',
    email: 'an.nguyen@example.com',
    phone: '+84901234567',
    amount: 980,
    payment_method: 'Payment with VNPAY',
    payment_status: 'completed',
    status: 'completed',
    tax_amount: 68,
    shipping_amount: 0,
  },
]

export default function OrderTable(){
 //   const faqsListQuery = useGetFaqsListQuery();
 //   const data = faqsListQuery.data?.payload.data ?? [];
 const data = paymentMockData;
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
                    columns={orderColumns}
                    pagination={true}        
                    isSortable
                />
            </div>
        </div>
    )
}


