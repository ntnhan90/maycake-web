import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Update Currency Page | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateCurrencyPage({params}: {params:{id:number}}) {
    const id :number= params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                Currencies
            </Card>
        </Container>
    );
}