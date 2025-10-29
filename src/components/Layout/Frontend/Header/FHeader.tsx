import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faCakeCandles,
    faPhoneVolume
} from "@fortawesome/free-solid-svg-icons"
export default function FHeader() {
    return (
        <div className="container-fluid px-0 d-none d-lg-block">
            <div className="row gx-0">
                <div className="col-lg-4 text-center bg-second py-3">
                    <div className="d-inline-flex align-items-center justify-content-center">
                        <i className="bi bi-envelope fs-1 text-primary me-3"></i>
                        <div className="text-start">
                            <h6 className="text-uppercase mb-1">Email Us</h6>
                            <span>info@example.com</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 text-center bg-pri border-inner py-3">
                    <div className="d-inline-flex align-items-center justify-content-center">
                        <a href="index.html" className="navbar-brand">
                            <h1 className="m-0 text-uppercase text-white">
                                <FontAwesomeIcon className="nav-icon ms-n3" icon={faCakeCandles} />
                                CakeZone
                            </h1>
                        </a>
                    </div>
                </div>
                <div className="col-lg-4 text-center bg-second py-3">
                    <div className="d-inline-flex align-items-center justify-content-center">
                        <FontAwesomeIcon className="fs-1 text-pri me-3" icon={faPhoneVolume} />
                        <div className="text-start">
                            <h6 className="text-uppercase mb-1">Call Us</h6>
                            <span>+012 345 6789</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}