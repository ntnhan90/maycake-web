import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import OrderForm from '../orderForm';

export const metadata: Metadata = {
    title: "Create Product | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CreateOrderPage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <OrderForm />
            </Card>
        </Container>
    );
}