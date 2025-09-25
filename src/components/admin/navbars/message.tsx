import {Dropdown} from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';

const ListMessage = () =>{
    return (
        <div className="message-notif-scroll scrollbar-outer">
			<div className="notif-center">
				<Link href="#">
					<div className="notif-img">
						<Image src="/img/jm_denis.jpg" alt="Img Profile" />
					</div>
					<div className="notif-content">
						<span className="subject">Jimmy Denis</span>
						<span className="block"> How are you ? </span>
						<span className="time">5 minutes ago</span>
					</div>
				</Link>
				<Link href="#">
					<div className="notif-img">
						<Image src="/img/chadengle.jpg" alt="Img Profile" />
					</div>
					<div className="notif-content">
						<span className="subject">Chad</span>
						<span className="block"> Ok, Thanks ! </span>
						<span className="time">12 minutes ago</span>
					</div>
				</Link>
				<Link href="#">
					<div className="notif-img">
						<Image src="/img/mlane.jpg" alt="Img Profile" />
					</div>
					<div className="notif-content">
						<span className="subject">Jhon Doe</span>
						<span className="block">Ready for the meeting today... </span>
						<span className="time">12 minutes ago</span>
					</div>
				</Link>
				<Link href="#">
					<div className="notif-img">
						<Image src="/img/talha.jpg" alt="Img Profile" />
					</div>
					<div className="notif-content">
						<span className="subject">Talha</span>
						<span className="block"> Hi, Apa Kabar ? </span>
						<span className="time">17 minutes ago</span>
					</div>
				</Link>
			</div>
		</div>
    )
}
  

const Message = () =>{
    return(
        <Dropdown as="li" className="nav-item topbar-icon dropdown hidden-caret">
			<Dropdown.Toggle as="a" className='nav-link'>
                <i className="fa fa-envelope"></i>
			</Dropdown.Toggle>

			<Dropdown.Menu as="ul" className=' messages-notif-box animated fadeIn' >
			    <Dropdown.Item as="li" eventKey="1">
                    <div className="dropdown-title d-flex justify-content-between align-items-center">
						Messages
						<Link href="#" className="small">Mark all as read</Link>
                    </div>
                </Dropdown.Item>
				<Dropdown.Item as="li">
                    <ListMessage />
                </Dropdown.Item>
				<Dropdown.Item as="li" eventKey="4">
                    <Link className="see-all" href="#" >See all messages<i className="fa fa-angle-right"></i>
                    </Link>
                </Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>

    )
}


export default Message;