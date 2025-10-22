import { Container } from "react-bootstrap"
import BlogForm from "../BlogForm"
import BreadcrumbExample from "@/components/breadcrumbs"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Create a new post| Maycake',
    description: 'The best restaurant in the world'
}

export default function AdminCreatePosts () {
    return (
        <Container>
            <div className="row">
                <h1 className="mb-3 h2">User</h1>
                <BreadcrumbExample />
            </div>
            <BlogForm />       
        </Container>
    )
}