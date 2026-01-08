import { Card , CardBody, CardHeader, Container, Row} from 'react-bootstrap';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Platform Administration",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};


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
                                    <Link className="text-decoration-none text-primary" href="/admin/systems/users">
                                    Users
                                    </Link>
                                </div>
                                <small className="text-secondary">View and update your system users</small>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="col">
                                <div className="d-block mb-1 panel-section-item-title">
                                    <Link className="text-decoration-none text-primary" href="/admin/systems/roles">
                                    Roles And Permissions
                                    </Link>
                                </div>
                                <small className="text-secondary">View and update your roles and permissions</small>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="col">
                                <div className="d-block mb-1 panel-section-item-title">
                                    <Link className="text-decoration-none text-primary" href="/admin/systems/logs">
                                    Activity Logs (no)
                                    </Link>
                                </div>
                                <small className="text-secondary">View and delete your system activity logs</small>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="col">
                                <div className="d-block mb-1 panel-section-item-title">
                                    <Link className="text-decoration-none text-primary" href="/admin/systems/backup">
                                    Backup (no)
                                    </Link>
                                </div>
                                <small className="text-secondary">Backup database.</small>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="col">
                                <div className="d-block mb-1 panel-section-item-title">
                                    <Link className="text-decoration-none text-primary" href="/admin/systems/cronjob">
                                    Cronjob (no)
                                    </Link>
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