import { Card , Container , Nav} from 'react-bootstrap';
import { Metadata } from "next";
import MaterialForm from '../materialForm';

export const metadata: Metadata = {
    title: "Create Material | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateMaterialPage({params}: {params:{id:number}}){
    const id:number = params.id
    return(
        <Container>
            <Card className='mb-4 border-0'>
                <MaterialForm id={id} />
            </Card>
        </Container>
    )
}