import { Card , CardBody, CardHeader, Container, Row} from 'react-bootstrap';


export default function SettingsPage() {
    return (
         <Container>
            <Card className="mb-4">
                <CardHeader>
                    <h5 className='card-title'>Common</h5>
                </CardHeader>
                <CardBody>
                    <Row className='g-3'>
                        <div className="col-12 col-md-4">
                            <div className="col">
                                <div className="d-block mb-1 panel-section-item-title">
                                    <a className="text-decoration-none text-primary" href="#">
                                    Genaral
                                    </a>
                                </div>
                                <small className="text-secondary">View and update your general settings</small>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="col">
                                <div className="d-block mb-1 panel-section-item-title">
                                    <a className="text-decoration-none text-primary" href="#">
                                    Email
                                    </a>
                                </div>
                                <small className="text-secondary">View and update your email settings and email templates</small>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="col">
                                <div className="d-block mb-1 panel-section-item-title">
                                    <a className="text-decoration-none text-primary" href="#">
                                    Email templates
                                    </a>
                                </div>
                                <small className="text-secondary">Email templates using HTML & system variables</small>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="col">
                                <div className="d-block mb-1 panel-section-item-title">
                                    <a className="text-decoration-none text-primary" href="#">
                                    Media
                                    </a>
                                </div>
                                <small className="text-secondary">View and update your media settings.</small>
                            </div>
                        </div>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    );
}