import { Metadata } from 'next';
import {  Container } from 'react-bootstrap';
import Link from 'next/link';
import ProductTable from './productTable';

export const metadata: Metadata = {
    title: "Product Admin",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function EcomProductPage() {
    return (
        <Container>
            <div className="row mb-5">
                <div className="col">
                    <div className="d-md-flex justify-content-between align-items-center mb-8 w-100">
                        <div>
                            <h1 className="mb-3 h2">Product</h1>
                            <div className="mt-4">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link role="button"  href="/admin/ecommerce/products/create" className=" d-md-flex align-items-center gap-2 btn btn-dark">
                                Create
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <ProductTable />
        </Container>
    );
}