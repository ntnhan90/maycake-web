import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import FaqsForm from '../faqsForm';

export const metadata: Metadata = {
    title: "Create Faqs | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};



export default function CreateFaqsPage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <FaqsForm></FaqsForm>
            </Card>
        </Container>
    );
}