import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import DiscountForm from '../discountForm';

export const metadata: Metadata = {
    title: "Create Discount | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CreateDiscountPage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <DiscountForm />
            </Card>
        </Container>
    );
}