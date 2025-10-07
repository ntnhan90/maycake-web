import { Container } from "react-bootstrap";
import Link from "next/link";
export default function AdminProduct(){
    return (
        <Container >
            <div className="card mb-4 panel-section panel-section-system panel-section-priority-99999" id="panel-section-system-system" data-priority="99999" data-id="system" data-group-id="system">
                <div className="card-header">
                    <h4 className="card-title">
                        Platform Administration
                    </h4>
                </div>
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-12 col-sm-6 col-md-4">
                            <div className="row g-3 align-items-start">
                                <div className="col-auto">
                                    <div className="d-flex align-items-center justify-content-center panel-section-item-icon">
                                        <i className="fas fa-user-shield"></i>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-block mb-1 panel-section-item-title">
                                        <Link className="text-decoration-none text-primary fw-bold" href="/admin/system/users">
                                            Users
                                        </Link>
                                    </div>

                                    <div className="text-secondary mt-n1">View and update your system users</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 ">
                            <div className="row g-3 align-items-start">
                                <div className="col-auto">
                                    <div className="d-flex align-items-center justify-content-center panel-section-item-icon">
                                        <i className="fas fa-user-shield"></i>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-block mb-1 panel-section-item-title">
                                        <Link className="text-decoration-none text-primary fw-bold" href="/">
                                            Roles And Permissions
                                        </Link>
                                    </div>

                                    <div className="text-secondary mt-n1">View and update your roles and permissions</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 ">
                            <div className="row g-3 align-items-start">
                                <div className="col-auto">
                                    <div className="d-flex align-items-center justify-content-center panel-section-item-icon">
                                        <i className="fas fa-user-shield"></i>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-block mb-1 panel-section-item-title">
                                        <Link className="text-decoration-none text-primary fw-bold" href="/">
                                            Backup
                                        </Link>
                                    </div>

                                    <div className="text-secondary mt-n1">Backup database and uploads folder.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Container>
    )
}