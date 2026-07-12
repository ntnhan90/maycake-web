import { Metadata } from 'next';
import { Container } from 'react-bootstrap';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "CurrenciesPage Admin",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CurrenciesPage() {

    return (
         <Container>
            <div className="row mb-5">
                <div className="col">
                    <div className="d-md-flex justify-content-between align-items-center mb-8 w-100">
                        <div>
                            <h1 className="mb-3 h2">Google Analytics</h1>
                        </div>
                        <div>
                            <Link role="button"  href="#" className=" d-md-flex align-items-center gap-2 btn btn-dark">
                                Property ID for GA4
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}