import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import LabelForm from '../labelForm';

export const metadata: Metadata = {
    title: "Create Label | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};


export default function CreateProductLabelPage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <LabelForm />
            </Card>
        </Container>
    );
}