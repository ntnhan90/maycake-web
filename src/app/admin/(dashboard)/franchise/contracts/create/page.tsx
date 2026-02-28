import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import ContractForm from '../contractForm';

export const metadata: Metadata = {
    title: "Create Product Attributes| Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateFranchiseContractPagePage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <ContractForm />
            </Card>
        </Container>
    );
}