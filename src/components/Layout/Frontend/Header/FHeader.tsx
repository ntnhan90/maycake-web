import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faCakeCandles,
    faPhoneVolume,
    faEnvelope, faCheck
} from "@fortawesome/free-solid-svg-icons"
export default function FHeader() {
    return (
        <header id="header" className="header position-relative">
            <div className="top-bar py-2">
                <div className="container-fluid container-xl">
                    <div className="row align-items-center">
                        <div className="col-md-4 d-none">
                            <div className="top-bar-item">
                                <span>Need help? Call us: </span>
                                <a href="tel:+1234567890">+1 (234) 567-890</a>
                            </div>
                        </div>


                        <div className="col-md-4 d-none">
                            <div className="d-flex justify-content-end">
                                <div className="top-bar-item dropdown me-3">
                                    <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                                        <i className="bi bi-translate me-2"></i>EN
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="#">
                                            <FontAwesomeIcon className="selected-icon" icon={faCheck} />English
                                            </a>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Español</a></li>
                                        <li><a className="dropdown-item" href="#">Français</a></li>
                                        <li><a className="dropdown-item" href="#">Deutsch</a></li>
                                    </ul>
                                </div>
                                <div className="top-bar-item dropdown">
                                    <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                                    <i className="bi bi-currency-dollar me-2"></i>USD
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                <FontAwesomeIcon className="selected-icon" icon={faCheck} />USD
                                            </a>
                                        </li>
                                        <li><a className="dropdown-item" href="#">EUR</a></li>
                                        <li><a className="dropdown-item" href="#">GBP</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-header">
                <div className="container-fluid container-xl">
                    <div className="d-flex py-3 align-items-center justify-content-between">
                        <a href="index.html" className="logo d-flex align-items-center">
                            <h1 className="sitename">eStore</h1>
                        </a>

                        <form className="search-form desktop-search-form">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for products"/>
                                <button className="btn" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </form>

                        <div className="header-actions d-flex align-items-center justify-content-end">
                            <button className="header-action-btn mobile-search-toggle d-xl-none" type="button" data-bs-toggle="collapse" data-bs-target="#mobileSearch" aria-expanded="false" aria-controls="mobileSearch">
                                <i className="bi bi-search"></i>
                            </button>

                            <div className="dropdown account-dropdown">
                                <button className="header-action-btn" data-bs-toggle="dropdown">
                                    <i className="bi bi-person"></i>
                                </button>
                                <div className="dropdown-menu">
                                    <div className="dropdown-header">
                                        <h6>Welcome to <span className="sitename">eStore</span></h6>
                                        <p className="mb-0">Access account &amp; manage orders</p>
                                    </div>
                                    <div className="dropdown-body">
                                        <a className="dropdown-item d-flex align-items-center" href="account.html">
                                            <i className="bi bi-person-circle me-2"></i>
                                            <span>My Profile</span>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="account.html">
                                            <i className="bi bi-bag-check me-2"></i>
                                            <span>My Orders</span>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="account.html">
                                            <i className="bi bi-heart me-2"></i>
                                            <span>My Wishlist</span>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="account.html">
                                            <i className="bi bi-gear me-2"></i>
                                            <span>Settings</span>
                                        </a>
                                    </div>
                                    <div className="dropdown-footer">
                                        <a href="login-register.html" className="btn btn-primary w-100 mb-2">Sign In</a>
                                        <a href="login-register.html" className="btn btn-outline-primary w-100">Register</a>
                                    </div>
                                </div>
                            </div>

                            <a href="account.html" className="header-action-btn d-none d-md-block">
                                <i className="bi bi-heart"></i>
                                <span className="badge">0</span>
                            </a>

                            <a href="cart.html" className="header-action-btn">
                                <i className="bi bi-cart3"></i>
                                <span className="badge">3</span>
                            </a>

                            <i className="mobile-nav-toggle d-xl-none bi bi-list me-0"></i>

                        </div>
                    </div>
                </div>
            </div>

            <div className="header-nav">
                <div className="container-fluid container-xl">
                    <div className="position-relative">
                        <nav id="navmenu" className="navmenu">
                            <ul>
                                <li><a href="index.html" className="active">Home</a></li>
                                <li><a href="about.html">About</a></li>
                                <li><a href="category.html">Category</a></li>
                                <li><a href="product-details.html">Product Details</a></li>
                                <li><a href="cart.html">Cart</a></li>
                                <li><a href="checkout.html">Checkout</a></li>
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
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="collapse" id="mobileSearch">
                <div className="container">
                    <form className="search-form">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search for products" />
                            <button className="btn" type="submit">
                            <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </header>
    )
}