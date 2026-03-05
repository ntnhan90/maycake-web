import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import WarehouseForm from '../warehouseForm';

export const metadata: Metadata = {
    title: "Create Product Attributes| Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CreateWarehousePagePage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <WarehouseForm />
            </Card>
        </Container>
    );
}