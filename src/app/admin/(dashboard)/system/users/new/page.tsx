"use client"
import { Container } from "react-bootstrap";
import BreadcrumbExample from "@/components/breadcrumbs";
import { useForm ,SubmitHandler} from "react-hook-form"
import { Row , Col, Form} from "react-bootstrap";
import { useState } from 'react';

type FormValues = {
    firstName: string
    lastName: string
    email:string
    userName:string
    password:string
    confirmPassword:string
}

export default function AdminCreateUsers(){
    
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [showConPassword, setShowConPassword] = useState(false);
    const togglePasswordVisibility1 = () => {
        setShowConPassword(!showConPassword);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<FormValues>()
    const password = watch('password', '');
    const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

    return (
        <Container >
            <div className="row">
                <h1 className="mb-3 h2">User</h1>
                <BreadcrumbExample />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Create new Users</div>
                            </div>
                            <div className="card-body">
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>First Name</Form.Label>
                                        <input type="text" className="form-control" placeholder="Enter first Name" 
                                            {...register("firstName", { required: "This field is required" })}
                                        />
                                        {errors.firstName && errors.firstName.type === "required" && (
                                            <span className="form-error">This is required</span>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Last Name</Form.Label>
                                        <input type="text" className="form-control" placeholder="Enter last Name" 
                                            {...register("lastName", { required: "This field is required" })} 
                                            />
                                        {errors.lastName && errors.lastName.type === "required" && (
                                            <span className="form-error">This is required</span>
                                        )}
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Username</Form.Label>
                                        <input type="text" className="form-control" placeholder="Enter userName" 
                                            {...register("userName", { required: "This field is required" })}
                                        />
                                        {errors.userName && (
                                            <span className="form-error">{errors.userName.message}</span>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
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
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Phone</Form.Label>
                                        <input type="text" className="form-control" placeholder="Enter phone"/>
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
                                <Row className="mb-3">
                                    <Form.Group >
                                        <Form.Label>Confirm Password</Form.Label>
                                        <div className="input-icon">
                                            <input 
                                                type={showConPassword ? 'text' : 'password'}
                                                className="form-control"
                                                placeholder="Enter confirm password"
                                                {...register('confirmPassword', {
                                                    required: 'Confirm Password is required',
                                                    validate: (value) =>
                                                    value === password || 'Passwords do not match', // Compare with watched password
                                                })}
                                            />
                                            
                                            <span className="input-icon-addon">
                                                <i 
                                                    className={showConPassword ? 'fa fa-eye' : 'fa fa-eye-slash'  }
                                                    onClick={togglePasswordVisibility1}>
                                                </i>
                                            </span>
                                        </div>
                                        {   errors.confirmPassword &&
                                            <span className="form-error">{errors.confirmPassword.message}</span>
                                         }
                                    </Form.Group>
                                </Row>
                            </div>
                        </div>
                    </div>
                            
                    <div className="col-md-3 ">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Publish</h4>
                            </div>
                            <div className="card-body">
                                <div className="btn-list">
                                    <button className="btn btn-primary" type="submit" value="apply" name="submitter">
                                        Save
                                    </button>
                                    <button className="btn" type="submit" name="submitter" value="save">
                                        Save &amp; Exit
                                    </button>
                                 </div>
                            </div>
                        </div>
                        <div className="card meta-boxes">
                            <div className="card-header">
                                <h4 className="card-title">
                                    <label className="form-label form-label required" htmlFor="role">
                                        Role
                                    </label>
                                </h4>
                            </div>
                            
                            <div className=" card-body">
                                <select className="form-select" required id="status-select-47896" name="status" aria-required="true">
                                    <option value="admin">Admin</option>
                                </select>
                             </div>
                        </div>

                    </div>
                </div>
            </form>
        </Container>
    )
}

/*
export default function AdminCreateUsers() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("firstName", { required: "This field is required" })} />
            {errors.firstName && errors.firstName.type === "required" && (
                <span>This is required</span>
            )}
            <input {...register("lastName")} />
            <input type="email" {...register("email")} />

            <input type="submit" />
        </form>
    )
}
*/