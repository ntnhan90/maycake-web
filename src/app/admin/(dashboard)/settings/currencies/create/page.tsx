import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import CurrencyForm from '../currencyForm';

export const metadata: Metadata = {
    title: "Create Currency | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CreateCurrencyPage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <CurrencyForm />
            </Card>
        </Container>
    );
}