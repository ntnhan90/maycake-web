import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import TagForm from '../tagForm';
import { param } from 'cypress/types/jquery';

export const metadata: Metadata = {
    title: "Update Tag | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateTagPage({params}: {params:{id:number}}) {
    const id:number = params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                <TagForm id={id}></TagForm>
            </Card>
        </Container>
    );
}