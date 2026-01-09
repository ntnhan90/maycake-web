import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import OrderForm from '../orderForm';

export const metadata: Metadata = {
    title: "Update Order | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateOrderPage({params}: {params:{id:number}}) {
    const id :number= params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                <OrderForm id={id}/>
            </Card>
        </Container>
    );
}
