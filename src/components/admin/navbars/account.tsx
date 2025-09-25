import {
    Dropdown
} from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';

const Account = () =>{
    return(
        <Dropdown as="li" className="nav-item topbar-user dropdown hidden-caret">
			<Dropdown.Toggle as="a" className='profile-pic' >
                <div className="avatar-sm">
                    <Image width={39} height={39} src="/img/profile.jpg"  alt="..."
                        className="avatar-img rounded-circle"
                    />
                </div>
                <span className="profile-username">
                    <span className="op-7">Hi,</span>
                    <span className="fw-bold">Hizrian</span>
                </span>
			</Dropdown.Toggle>

			<Dropdown.Menu as="ul" className='notif-box animated fadeIn' >
                <div className="dropdown-user-scroll scrollbar-outer">
                    <li>
                        <div className="user-box">
                            <div className="avatar-lg">
                                <Image width={39} height={39} src="/img/profile.jpg"  alt="image profile"  className="avatar-img rounded"  />
                            </div>
                            <div className="u-text">
                                <h4>Hizrian</h4>
                                <p className="text-muted">hello@example.com</p>
                                <Link  href="#" className="btn btn-xs btn-secondary btn-sm" >View Profile</Link>
                          </div>
                        </div>
                    </li>
                    <li>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" href="#">My Profile</Link>
                        <Link className="dropdown-item" href="#">Inbox</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" href="#">Account Setting</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" href="#">Logout</Link>
                     </li>
                </div>
			</Dropdown.Menu>
		</Dropdown>

    )
}


export default Account;