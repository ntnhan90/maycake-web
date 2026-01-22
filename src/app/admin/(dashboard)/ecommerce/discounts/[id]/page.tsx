import { Card , Container } from 'react-bootstrap';
import { Metadata } from "next";
import DiscountForm from '../discountForm';

export const metadata: Metadata = {
    title: "Update Discount | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateDiscountPage({params}: {params:{id:number}}) {
    const id:number = params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                <DiscountForm id={id} />
            </Card>
        </Container>
    );
}