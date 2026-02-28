import { Card , Container } from 'react-bootstrap';
import { Metadata } from "next";
import CrmForm from '../crmForm';
import { param } from 'cypress/types/jquery';

export const metadata: Metadata = {
    title: "Update Blog Franchise | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateFranchiseCrmPage({params}: {params:{id:number}}) {
    const id:number = params.id

    return (
        <Container>
            <Card className="mb-4 border-0">
                <CrmForm  id={id}/>
            </Card>
        </Container>
    );
}