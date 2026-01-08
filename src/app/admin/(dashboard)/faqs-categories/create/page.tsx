import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import FaqCateForm from '../faqCateForm';

export const metadata: Metadata = {
    title: "Create FaqCate | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CreateFaqsCatePage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <FaqCateForm></FaqCateForm>
            </Card>
        </Container>
    );
}