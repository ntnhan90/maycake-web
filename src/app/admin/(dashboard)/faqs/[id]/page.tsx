import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import FaqsForm from '../faqsForm';

export const metadata: Metadata = {
    title: "Update Faqs | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};


export default function UpdateFaqsPage({params}: {params:{id:number}}) {
    const id:number = params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                <FaqsForm id={id}></FaqsForm>
            </Card>
        </Container>
    );
}