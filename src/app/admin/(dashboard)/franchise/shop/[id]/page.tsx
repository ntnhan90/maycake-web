import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import ShopForm from '../shopForm';

export const metadata: Metadata = {
    title: "Update Product Attributes| Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateShopPage({params}: {params:{id:number}}) {
    const id :number= params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                <ShopForm id={id} />
            </Card>
        </Container>
    );
}