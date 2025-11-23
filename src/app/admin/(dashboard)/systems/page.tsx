import { Card , CardBody, CardHeader, Container, Row} from 'react-bootstrap';

export default function SystemPage() {
    return (
        <Container>
            <Card className="mb-4">
                <CardHeader>
                    <h5 className='card-title'>Platform Administration</h5>
                </CardHeader>
                <CardBody>
                    <Row className='g-3'>
                        <div className="col-12 col-md-4">
                            <div className="col">
                                <div className="d-block mb-1 panel-section-item-title">
                                    <a className="text-decoration-none text-primary" href="#">
                                    Users
                                    </a>
                                </div>
                                <small className="text-secondary">View and update your system users</small>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="col">
                                <div className="d-block mb-1 panel-section-item-title">
                                    <a className="text-decoration-none text-primary" href="#">
                                    Roles And Permissions
                                    </a>
                                </div>
                                <small className="text-secondary">View and update your roles and permissions</small>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="col">
                                <div className="d-block mb-1 panel-section-item-title">
                                    <a className="text-decoration-none text-primary" href="#">
                                    Activity Logs
                                    </a>
                                </div>
                                <small className="text-secondary">View and delete your system activity logs</small>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="col">
                                <div className="d-block mb-1 panel-section-item-title">
                                    <a className="text-decoration-none text-primary" href="#">
                                    Backup
                                    </a>
                                </div>
                                <small className="text-secondary">Backup database.</small>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="col">
                                <div className="d-block mb-1 panel-section-item-title">
                                    <a className="text-decoration-none text-primary" href="#">
                                    Cronjob
                                    </a>
                                </div>
                                <small className="text-secondary">Cronjob allow you to automate certain commands or scripts on your site.</small>
                            </div>
                        </div>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    );
}