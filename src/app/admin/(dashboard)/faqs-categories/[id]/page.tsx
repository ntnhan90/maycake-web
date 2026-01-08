import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import FaqCateForm from '../faqCateForm';

export const metadata: Metadata = {
    title: "Update FaqCate | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};


export default function UpdateFaqsCatePage({params}: {params:{id:number}}) {
    const id:number = params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                <FaqCateForm id={id}></FaqCateForm>
            </Card>
        </Container>
    );
}