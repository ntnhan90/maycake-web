/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Fragment, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import {
  Accordion,
  Card,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";
import DashboardMenu from './data';
import Image from 'next/image';

const NavbarVertical = (props: any) =>{
    const pathname = usePathname()
    
    const CustomToggle = ({children, eventKey, icon}: any   ) => {
        const { activeEventKey} = useContext(AccordionContext);
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log("totally custom!")
        );
        const isCurrentEventKey = activeEventKey === eventKey;
        return (
            <li className='nav-item'>
                <Link href="#" className='' onClick={decoratedOnClick}
                    data-bs-toggle="collapse" data-bs-target="#navDashboard"
                    aria-expanded={isCurrentEventKey ? true : false}
                    aria-controls="navDashboard"
                >
                    { icon ? <i className={`nav-icon  fe fe-${icon} me-2`}></i>: ""} {" "}
                    {children}
                </Link>
            </li>
        )
    }

    return(
        <Fragment>
            <div className="sidebar" data-background-color="dark">
                <div className="sidebar-logo">
                    <div className="logo-header" data-background-color="dark">
                        <Link href="#" className="logo">
                            <Image src="/img/kaiadmin/logo_light.svg"
                                alt="navbar brand"  className="navbar-brand"
                                height="20" width={134}
                            />
                        </Link>
                        <div className="nav-toggle">
                            <button 
                                className="btn btn-toggle toggle-sidebar"
                                onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}
                            >
                                <i className="gg-menu-right"></i>
                            </button>
                            
                        </div>
                    </div>
                </div>

                <div className="sidebar-wrapper scrollbar scrollbar-inner">
                    <div className="sidebar-content">
                        <Accordion as="ul" className="nav nav-secondary" key="0">
                            {DashboardMenu.map(function (menu:any,index:any){
                                if(menu.grouptitle){
                                    return (
                                        <Card as="li" bsPrefix="nav-section" key={index}>
                                            <h4 className="text-section">{menu.title}</h4>
                                        </Card>
                                    );
                                }else{ 
                                    if(menu.children){
                                        return(
                                            <Accordion.Item eventKey={index} as="li" className='nav-item' key={index}>
                                                <Accordion.Header as="a">
                                                    <i className={menu.icon} ></i>
                                                    <p>{menu.title}</p>
                                                    <span className="caret"></span>
                                                </Accordion.Header>
                                                <Accordion.Body key={index} as="ul" className='nav nav-collapse'>
                                                {menu.children.map(function(
                                                    menuLevel1Item:any,
                                                    menuLevel1Index:any ){
                                                    return(
                                                        <li key={menuLevel1Index}>
                                                            <a href={menuLevel1Item.link}>
                                                                <i className={menuLevel1Item.icon} ></i>
                                                                <span className="sub-item">{menuLevel1Item.name}</span>
                                                            </a>
                                                        </li>
                                                    )
                                                })}
                                                    </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    }else{
                                        return (
                                        <li className={`nav-item ${
                                            pathname === menu.link ? "active" : ""
                                        }`} key={index}>
                                            <Link href={menu.link} >
                                                {typeof menu.icon === "string" ? (
                                                    <i className={menu.icon} ></i>
                                                ) : (
                                                    menu.icon
                                                )}
                                                <p>{menu.title} </p>
                                            </Link>
                                        </li>
                                        )
                                    }
                                }
                            })}  
                        </Accordion>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default NavbarVertical;