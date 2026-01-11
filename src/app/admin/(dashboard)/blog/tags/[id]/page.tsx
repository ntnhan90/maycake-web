import { Card , Container } from 'react-bootstrap';
import { Metadata } from "next";
import BlogTagForm from '../tagForm';

export const metadata: Metadata = {
    title: "Update Tag | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateTagPage({params}: {params:{id:number}}) {
    const id:number = params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                <BlogTagForm id={id} />
            </Card>
        </Container>
    );
}