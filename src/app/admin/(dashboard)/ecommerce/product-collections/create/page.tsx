import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import ColectionForm from '../collectionForm';

export const metadata: Metadata = {
    title: "Create Label | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};


export default function CreateProductCollectionPage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <ColectionForm />
            </Card>
        </Container>
    );
}