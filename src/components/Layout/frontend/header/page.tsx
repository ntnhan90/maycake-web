import Link from 'next/link'
import { Container } from 'react-bootstrap'

export default function FHeader() {
    return (
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="header__top__inner">
                                <div className="header__top__left">
                                    <ul>
                                        <li>USD <span className="arrow_carrot-down"></span>
                                            <ul>
                                                <li>EUR</li>
                                                <li>USD</li>
                                            </ul>
                                        </li>
                                        <li>ENG <span className="arrow_carrot-down"></span>
                                            <ul>
                                                <li>Spanish</li>
                                                <li>ENG</li>
                                            </ul>
                                        </li>
                                        <li><a href="#">Sign in</a> <span className="arrow_carrot-down"></span></li>
                                    </ul>
                                </div>
                                <div className="header__logo">
                                    <a href="./index.html"><img src="img/logo.png" alt="" /></a>
                                </div>
                                <div className="header__top__right">
                                    <div className="header__top__right__links">
                                        <a href="#" className="search-switch"><img src="img/icon/search.png" alt="" /></a>
                                        <a href="#"><img src="img/icon/heart.png" alt="" /></a>
                                    </div>
                                    <div className="header__top__right__cart">
                                        <a href="#"><img src="img/icon/cart.png" alt="" /> <span>0</span></a>
                                        <div className="cart__price">Cart: <span>$0.00</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="canvas__open"><i className="fa fa-bars"></i></div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <nav className="header__menu mobile-menu">
                            <ul>
                                <li className="active"><a href="/">Home</a></li>
                                <li><a href="/about">About</a></li>
                                <li><a href="/shop">Shop</a></li>
                                <li><a href="#">Pages</a>
                                    <ul className="dropdown">
                                        <li><a href="/shop-details">Shop Details</a></li>
                                        <li><a href="/shoping-cart">Shoping Cart</a></li>
                                        <li><a href="/checkout">Check Out</a></li>
                                        <li><a href="/wisslist">Wisslist</a></li>
                                    </ul>
                                </li>
                                <li><a href="/blog">Blog</a></li>
                                <li><a href="/contact">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}