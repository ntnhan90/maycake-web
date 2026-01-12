import { Card , Container } from 'react-bootstrap';
import { Metadata } from "next";
import PostForm from '../postForm';

export const metadata: Metadata = {
    title: "Update Tag | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateTagPage({params}: {params:{id:number}}) {
    const id:number = params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                <PostForm id={id} />
            </Card>
        </Container>
    );
}