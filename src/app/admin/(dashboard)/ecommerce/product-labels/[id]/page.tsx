import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import LabelForm from '../labelForm';

export const metadata: Metadata = {
    title: "Update Label Page | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};


export default function UpdateProductLabelPage({params}: {params:{id:number}}) {
    const id :number= params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                <LabelForm id={id} />
            </Card>
        </Container>
    );
}