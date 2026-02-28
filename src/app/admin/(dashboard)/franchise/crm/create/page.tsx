import { Card , Container } from 'react-bootstrap';
import { Metadata } from "next";
import CrmForm from '../crmForm';

export const metadata: Metadata = {
    title: "Create Blog Posts | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CreateFranchiseCrmPage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <CrmForm />
            </Card>
        </Container>
    );
}