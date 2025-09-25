
import { Container , Form} from "react-bootstrap";


export default function AdminLogin(){
    return (
        <Container >
            <Form className="text-center">
                <div className="col-md-6 col-lg-4 offset-4">
                    <div className="form-group">
                        <label htmlFor="email2">Email Address</label>
                        <input type="email" className="form-control" id="email2" placeholder="Enter Email" />
                        <small id="emailHelp2" className="form-text text-muted">
                            We&apos;ll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                </div>
                <div className="card-action">
                    <button className="btn btn-success">Submit</button>
                    <button className="btn btn-danger">Cancel</button>
                </div>
            </Form>
        </Container>
    )
}