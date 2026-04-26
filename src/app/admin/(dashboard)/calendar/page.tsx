import { Card , CardBody, CardHeader, Container, Row} from 'react-bootstrap';
import Calendar from '@/components/calender/calender';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Setting Admin",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function SettingsPage() {
    return (
        <Container>
            <Calendar />            
        </Container>
    );
}