import { Container } from "react-bootstrap";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users List",
  description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function AdminUsers(){
    return (
        <Container >
            Users
        </Container>
    )
}