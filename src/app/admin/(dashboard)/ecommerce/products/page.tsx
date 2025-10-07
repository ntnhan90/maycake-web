import { Container , Button} from "react-bootstrap";
import BreadcrumbExample from "@/components/breadcrumbs";
import ProductListing from "./ProductListing";

export default function AdminProduct(){
    return (
        <Container >
            <div className="d-md-flex justify-content-between align-items-center mb-8 w-100">
                <div>
                    <h1 className="mb-3 h2">Products</h1>
                    <BreadcrumbExample />
                </div>
                <div>
                    <Button  href="#"  variant="primary" className="d-md-flex align-items-center gap-1">
                        <i className="fas fa-plus"></i>
                        New Product
                    </Button>
                </div>
            </div>
            <ProductListing />
        </Container>
    )
}