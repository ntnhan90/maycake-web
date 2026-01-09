import { Metadata } from 'next';
import { Container } from 'react-bootstrap';
import { SalesReportsChart } from './report';
import { DashboardStats } from './dashboardStats';

export const metadata: Metadata = {
    title: "Reports List | Dasher - Responsive Bootstrap 5 Admin Dashboard",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};


export default function EcomReportPage() {
    return (
        <Container>
            <div className="row mb-5">
                <DashboardStats />
                <SalesReportsChart />
                
            </div>
        </Container>
    );
}