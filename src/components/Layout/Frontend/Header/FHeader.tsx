import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faCakeCandles,
    faPhoneVolume
} from "@fortawesome/free-solid-svg-icons"
export default function FHeader() {
    return (
        <header id="header" className="header fixed-top">
            <div className="topbar d-flex align-items-center dark-background">
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-envelope d-flex align-items-center">
                            <a href="mailto:contact@example.com">contact@example.com</a>
                        </i>
                        <i className="bi bi-phone d-flex align-items-center ms-4">
                            <span>+1 5589 55488 55</span>
                        </i>
                    </div>
                    <div className="social-links d-none d-md-flex align-items-center">
                        <a href="#" className="twitter">
                            <i className="bi bi-twitter-x"></i>
                        </a>
                        <a href="#" className="facebook">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="#" className="instagram">
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a href="#" className="linkedin">
                            <i className="bi bi-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="branding d-flex align-items-cente">
                <div className="container position-relative d-flex align-items-center justify-content-between">
                    <a href="index.html" className="logo d-flex align-items-center">
                        <h1 className="sitename">Platia</h1>
                    </a>
                    <nav id="navmenu" className="navmenu">
                        <ul>
                            <li><a href="#hero" className="active">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#menu">Menu</a></li>
                            <li><a href="#book-a-table">Book a Table</a></li>
                            <li><a href="#chefs">Chefs</a></li>
                            <li><a href="#events">Events</a></li>
                            <li className="dropdown"><a href="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                            <ul>
                                <li><a href="#">Dropdown 1</a></li>
                                <li className="dropdown"><a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                                <ul>
                                    <li><a href="#">Deep Dropdown 1</a></li>
                                    <li><a href="#">Deep Dropdown 2</a></li>
                                    <li><a href="#">Deep Dropdown 3</a></li>
                                    <li><a href="#">Deep Dropdown 4</a></li>
                                    <li><a href="#">Deep Dropdown 5</a></li>
                                </ul>
                                </li>
                                <li><a href="#">Dropdown 2</a></li>
                                <li><a href="#">Dropdown 3</a></li>
                                <li><a href="#">Dropdown 4</a></li>
                            </ul>
                            </li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                    </nav>
                </div>
            </div>
        </header>
    )
}