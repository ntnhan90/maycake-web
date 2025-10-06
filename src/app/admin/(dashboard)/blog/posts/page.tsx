import { Container, Button } from "react-bootstrap";
//import node modules libraries
import { Fragment } from "react";
import { Metadata } from "next";
import BreadcrumbExample from "@/components/breadcrumbs";
import BlogList from "./BlogList";

export const metadata: Metadata = {
  title: "Post List | Dasher - Responsive Bootstrap 5 Admin Dashboard",
  description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function AdminBlogPosts(){
    return (
        <Fragment>
            <Container >
                <div className="d-md-flex justify-content-between align-items-center mb-8 w-100">
                    <div>
                        <h1 className="mb-3 h2">Blog List</h1>
                        <BreadcrumbExample />
                    </div>
                    <div>
                        <Button  href="#"  variant="primary" className="d-md-flex align-items-center gap-1">
                            <i className="fas fa-plus"></i>
                            New Post
                        </Button>
                    </div>
                </div>
                <BlogList />
            </Container>
        </Fragment>
    )
}