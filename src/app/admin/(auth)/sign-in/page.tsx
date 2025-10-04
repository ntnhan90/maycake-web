//import node modules libraries
import { Fragment } from "react";
import Feedback from "react-bootstrap/Feedback";
import {
  Row,
  Col,
  Image,
  Card,
  CardBody,
  Form,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { Metadata } from "next";
import Link from "next/link";



import { getAssetPath } from "@/helper/assetPath";

export const metadata: Metadata = {
  title: "Sign In | Dasher - Responsive Bootstrap 5 Admin Dashboard",
  description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

const SignIn = () => {
  return (
    <Fragment>
        <Row className="mb-5">
            <Col xl={{ span: 4, offset: 4 }} md={12}>
                <div className="text-center">
                    <Link href="/" className="fs-2 fw-bold d-flex align-items-center gap-2 justify-content-center mb-6"
                    >
                    <Image src={getAssetPath("/images/brand/logo/logo-icon.svg")} alt="Dasher" />
                    <span>Dasher</span>
                    </Link>
                    <h1 className="mb-1">Welcome Back</h1>
                
                </div>
            </Col>
        </Row>

        <Row className="justify-content-center">
            <Col xl={5} lg={6} md={8}>
                <Card className="card-lg mb-6">
                    <CardBody className="p-6">
                        <Form className="mb-6">
                            <div className="mb-3">
                                <FormLabel htmlFor="signinEmailInput">
                                    Email <span className="text-danger">*</span>
                                </FormLabel>
                                <FormControl type="email" id="signinEmailInput" />
                                    <Feedback type="invalid">Please enter email.</Feedback>
                            </div>
                            <div className="mb-3">
                                <FormLabel htmlFor="formSignUpPassword">Password</FormLabel>
                                <div className="password-field position-relative">
                                <FormControl  type="password"  id="formSignUpPassword"  className="fakePassword"  />
                                <span>
                                </span>
                            </div>
                            <Feedback type="invalid">Please enter password.</Feedback>
                            </div>
                        
                            <div className="d-grid">
                            <Button variant="primary" type="button">
                                Sign In
                            </Button>
                            </div>
                        </Form>

                    
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Fragment>
  );
};

export default SignIn;
