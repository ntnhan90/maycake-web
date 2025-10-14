"use client"
import { Container } from "react-bootstrap";
import { Metadata } from "next";
import BreadcrumbExample from "@/components/breadcrumbs";


export const metadata: Metadata = {
  title: "Create Users",
  description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function AdminUsers(){

    return (
        <Container >
            <div className="d-md-flex justify-content-between align-items-center mb-8 w-100">
                <div>
                    <h1 className="mb-3 h2">User</h1>
                    <BreadcrumbExample />
                </div>

            </div>
        </Container>
    )
}