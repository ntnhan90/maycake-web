import {  Container } from 'react-bootstrap';
import { Metadata } from "next";
import AdminContactForm from '../contactForm';

export const metadata: Metadata = {
    title: "Update Contact | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};



export default function UpdateContactPage({params}: {params:{id:number}}) {
    const id :number= params.id
    return (
        <Container>
            <AdminContactForm id={id} /> 
        </Container>
    );
}