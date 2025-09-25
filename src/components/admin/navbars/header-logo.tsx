import Image from "next/image"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HeaderLogo = (props:any) =>{
    return(
        <div className="main-header-logo">
            <div className="logo-header" data-background-color="dark">
				<a href="#" className="logo">
					<Image src="/img/kaiadmin/logo_light.svg" alt="navbar brand"
						className="navbar-brand" height="20" width={134}
					/>
				</a>
				<div className="nav-toggle">
					<button 
                        className="btn btn-toggle sidenav-toggler"
                        onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}
                    >
						<i className="gg-menu-left"></i>
					</button>
				</div>
				<button className="topbar-toggler more">
					<i className="gg-more-vertical-alt"></i>
				</button>
			</div>
        </div>
    )
}
export default HeaderLogo