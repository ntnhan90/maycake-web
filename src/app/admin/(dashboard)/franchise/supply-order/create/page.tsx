import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import SupplyOrderForm from '../supplyOrderForm';

export const metadata: Metadata = {
    title: "Create Product Attributes| Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CreateFranchiseContractPagePage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <SupplyOrderForm />
            </Card>
        </Container>
    );
}