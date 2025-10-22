//import node modules libraries
"use client"
import { Fragment } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
} from "react-bootstrap";
import { useForm ,SubmitHandler} from "react-hook-form"
import { useState } from "react";


type FormValues = {
    firstName: string
    lastName: string
    email:string
    userName:string
    password:string
    confirmPassword:string
}

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
        
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()
    
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
    }

    return (
        <Fragment>
            <Row className="mb-5">
                <Col xl={{ span: 4, offset: 4 }} md={12}>
                    <div className="text-center">
                        <h1 className="mb-1">Welcome Back</h1>
                    </div>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xl={5} lg={6} md={8}>
                    <Card className="card-lg mb-6">
                        <CardBody className="p-6">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Row className="mb-3">
                                    <Form.Group >
                                        <Form.Label>Email</Form.Label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address",
                                            },
                                            })}
                                            placeholder="Email"
                                        />
                                            
                                        {errors.email  && (
                                            <span className="form-error">{errors.email.message}</span>
                                        )}
                                    </Form.Group>
                                </Row>              
                                <Row className="mb-3">
                                    <Form.Group >
                                        <Form.Label>Password</Form.Label>
                                        <div className="input-icon">
                                            <input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control" placeholder="Enter password "
                                                {...register("password",  { 
                                                    required: "This field is required" ,
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Password must be at least 6 characters',
                                                    },
                                                } )} 
                                            />
                                            <span className="input-icon-addon">
                                                <i 
                                                    className={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'  }
                                                    onClick={togglePasswordVisibility}>
                                                </i>
                                            </span>
                                        </div>
                                        {errors.password && (
                                            <span className="form-error">{errors.password.message}</span>
                                        )}
                                        
                                    </Form.Group>
                                </Row>
                            
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary mt-4">Sign In</button>
                                </div>
                                <style jsx>{`
                                    form .form-error {
                                        color: red;
                                    }
                                `}</style>
                            </form>

                        
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default SignIn;
