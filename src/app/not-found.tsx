'use client'
import { Fragment } from "react";
import { Col, Row, Image } from "react-bootstrap";
import Link from "next/link";

const Error404 =() =>{
    return(
        <Fragment>
            <Row>
                <Col sm={12}>
                    <div className="text-center">
                        <div className="mb-3">
                        <Image   src="/images/error/404-error-img.png"
                            alt=""   className="img-fluid"
                        />
                        </div>
                        <h1 className="display-4 fw-bold">Oops! the page not found.</h1>
                        <p className="mb-4">
                        Or simply leverage the expertise of our consultation team.
                        </p>
                        <Link href="/" className="btn btn-primary">
                        Go Home
                        </Link>
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Error404