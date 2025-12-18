import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Product | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CreateProductPage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
            </Card>
        </Container>
    );
}