import {use} from 'react';
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Payments',
    description: 'The best restaurant in the world'
}
export default function PaymentsPage() {
    return (
            <p className="max-w-[590px]">
           payments
            </p>
    );
}