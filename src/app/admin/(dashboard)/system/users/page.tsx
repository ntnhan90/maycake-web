import { Container, Button } from "react-bootstrap";
import { Metadata } from "next";
import BreadcrumbExample from "@/components/breadcrumbs";
import UserListing from "./UserList";

export const metadata: Metadata = {
  title: "Users List",
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
                <div>
                    <Button  href="#"  variant="primary" className="d-md-flex align-items-center gap-1">
                        <i className="fas fa-plus"></i>
                        New Users
                    </Button>
                </div>
            </div>
            <UserListing />
        </Container>
    )
}