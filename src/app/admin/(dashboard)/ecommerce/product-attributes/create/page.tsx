import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import ProAttributeForm from '../attributeForm';

export const metadata: Metadata = {
    title: "Create Product Attributes| Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateProductPage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <ProAttributeForm />
            </Card>
        </Container>
    );
}