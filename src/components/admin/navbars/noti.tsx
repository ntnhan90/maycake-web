import {
    Dropdown
} from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
const ListNoti = () =>{
    return (
        <div className="notif-scroll scrollbar-outer">
			<div className="notif-center">
				<Link href="#">
                    <div className="notif-icon notif-primary">
                        <i className="fa fa-user-plus"></i>
                    </div>
                    <div className="notif-content">
                        <span className="block"> New user registered </span>
                        <span className="time">5 minutes ago</span>
                    </div>
				</Link>
				<Link href="#">
                    <div className="notif-icon notif-success">
                        <i className="fa fa-comment"></i>
                    </div>
                    <div className="notif-content">
                        <span className="block">
                                Rahmad commented on Admin
                        </span>
                        <span className="time">12 minutes ago</span>
                    </div>
				</Link>
				<Link href="#">
                    <div className="notif-img">
                        <Image src="/img/profile2.jpg" alt="Img Profile"  />
                    </div>
                    <div className="notif-content">
                        <span className="block">
                            Reza send messages to you
                        </span>
                        <span className="time">12 minutes ago</span>
                    </div>
				</Link>
				<Link href="#">
                    <div className="notif-icon notif-danger">
                        <i className="fa fa-heart"></i>
                    </div>
                    <div className="notif-content">
                        <span className="block"> Farrah liked Admin </span>
                        <span className="time">17 minutes ago</span>
                    </div>
				</Link>
			</div>
		</div>
    )
}
  

const Noti = () =>{
    return(
        <Dropdown as="li" className="nav-item topbar-icon dropdown hidden-caret">
			<Dropdown.Toggle as="a" className='nav-link' id="notifDropdown">
                <i className="fa fa-bell"></i>
                <span className="notification">4</span>
			</Dropdown.Toggle>

			<Dropdown.Menu as="ul" className='notif-box animated fadeIn' >
			    <Dropdown.Item as="li" eventKey="1">
                    <div className="dropdown-title d-flex">
                         You have 4 new notification
                    </div>
                </Dropdown.Item>
				<Dropdown.Item as="li">
                    <ListNoti />
                </Dropdown.Item>
				<Dropdown.Item as="li" eventKey="4">
                    <Link className="see-all" href="#" >See all notification<i className="fa fa-angle-right"></i>
                    </Link>
                </Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>

    )
}


export default Noti;