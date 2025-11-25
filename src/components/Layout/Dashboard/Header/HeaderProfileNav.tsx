import {
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    DropdownMenu,
    Nav,
    NavItem,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PropsWithChildren } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faGear, faPowerOff,} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import HeaderLogout from '@/components/Layout/Dashboard/Header/HeaderLogout'
import { getDictionary } from '@/locales/dictionary'
import DropdownAvatar from './Dropdown-avatar'
import DropdownLink from './Dropdown-link'

type ItemWithIconProps = {
  icon: IconDefinition;
} & PropsWithChildren

const ItemWithIcon = (props: ItemWithIconProps) => {
    const { icon, children } = props

    return (
        <>
            <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
            {children}
        </>
    )
}


export default async function HeaderProfileNav() {
    const dict = await getDictionary()
   
    return (
        <Nav>
            <Dropdown as={NavItem}>
                <DropdownAvatar />
                <DropdownMenu className="pt-0">
                    <DropdownHeader className="fw-bold">{dict.profile.settings.title}</DropdownHeader>
                    <DropdownLink />
                        
                    <Link href="#" passHref legacyBehavior>
                        <DropdownItem>
                        <ItemWithIcon icon={faGear}>{dict.profile.settings.items.settings}</ItemWithIcon>
                        </DropdownItem>
                    </Link>

                    <DropdownDivider />
                   
                    <HeaderLogout>
                        <DropdownItem>
                        <ItemWithIcon icon={faPowerOff}>{dict.profile.logout}</ItemWithIcon>
                        </DropdownItem>
                    </HeaderLogout>
                </DropdownMenu>
            </Dropdown>
        </Nav>
    )
}
