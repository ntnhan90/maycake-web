'use client'

import Link from "next/link"
import { Navbar, Form, Container } from "react-bootstrap"
import Message from './message';
import Noti from './noti'
import Account from './account';

const NavbarTop = () =>{
    return(
        <Navbar className="navbar-classic navbar navbar-expand-lg">
            <Container fluid>
                <Navbar className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
					<div className="input-group">
						<div className="input-group-prepend">
							<button type="submit" className="btn btn-search pe-1">
								<i className="fa fa-search search-icon"></i>
							</button>
						</div>
						<input type="text"placeholder="Search ..."className="form-control" />
					</div>
				</Navbar>
                <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
					<li className="nav-item topbar-icon dropdown hidden-caret d-flex d-lg-none">
                  		<a  className="nav-link dropdown-toggle"  data-bs-toggle="dropdown"
							href="#"  role="button"
							aria-expanded="false"    aria-haspopup="true"
                  		>
                    		<i className="fa fa-search"></i>
                  		</a>
						<ul className="dropdown-menu dropdown-search animated fadeIn">
							<Form className="navbar-left navbar-form nav-search">
								<div className="input-group">
									<input type="text" placeholder="Search ..." className="form-control" />
								</div>
							</Form>
						</ul>
                	</li>
					<Link className='btn btn-outline-secondary' href='#'>View website</Link>
                    <Message />
                    <Noti />
                    <Account />
				</ul>
            </Container>
        </Navbar>
    )
}

export default NavbarTop