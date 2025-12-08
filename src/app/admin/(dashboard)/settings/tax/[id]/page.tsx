import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import TaxForm from '../taxForm';

export const metadata: Metadata = {
    title: "Update Tax | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateTaxPage({params}: {params:{id:number}}) {
    const id :number= params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                <TaxForm id={id}></TaxForm>
            </Card>
        </Container>
    );
}