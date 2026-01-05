import { Metadata } from 'next';
import {  Container } from 'react-bootstrap';
import ContactTable from './contactTable';

export const metadata: Metadata = {
    title: "Contact Admin",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function ContactPage() {

    return (
        <Container>
            <div className="row mb-5">
                <div className="col">
                    <div className="d-md-flex justify-content-between align-items-center mb-8 w-100">
                        <div>
                            <h1 className="mb-3 h2">Contact</h1>
                            <div className="mt-4">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ContactTable />
        </Container>
    );
}