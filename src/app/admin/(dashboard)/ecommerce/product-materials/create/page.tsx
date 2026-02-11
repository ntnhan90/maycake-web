import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import MaterialForm from '../materialForm';

export const metadata: Metadata = {
    title: "Create Material | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CreateMaterialPage(){
    return(
        <Container>
            <Card className="mb-4 border-0">
                <MaterialForm></MaterialForm>
            </Card>
        </Container>
    )
}