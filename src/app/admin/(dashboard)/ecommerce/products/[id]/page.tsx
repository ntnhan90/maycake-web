import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import ProductForm from '../productForm';

export const metadata: Metadata = {
    title: "Create Product | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateProductPage({params}: {params:{id:number}}) {
    const id :number= params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                <ProductForm id={id}/>
            </Card>
        </Container>
    );
}