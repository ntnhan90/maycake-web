import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import BlogTagForm from '../tagForm';

export const metadata: Metadata = {
    title: "Create Blog Tag | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CreateTagPage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <BlogTagForm />
            </Card>
        </Container>
    );
}