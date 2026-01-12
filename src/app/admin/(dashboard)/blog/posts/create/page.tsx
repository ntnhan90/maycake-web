import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import PostForm from '../postForm';

export const metadata: Metadata = {
    title: "Create Blog Tag | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CreateTagPage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <PostForm />
            </Card>
        </Container>
    );
}