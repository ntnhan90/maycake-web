import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import TaxForm from '../taxForm';

export const metadata: Metadata = {
    title: "Create Tax | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CreateTaxPage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <TaxForm></TaxForm>
            </Card>
        </Container>
    );
}