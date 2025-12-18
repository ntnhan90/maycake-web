import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import ColectionForm from '../collectionForm';

export const metadata: Metadata = {
    title: "Update Collection | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};


export default function UpdateProductCollectionPage({params}: {params:{id:number}}) {
    const id :number= params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                <ColectionForm id={id}></ColectionForm>
            </Card>
        </Container>
    );
}