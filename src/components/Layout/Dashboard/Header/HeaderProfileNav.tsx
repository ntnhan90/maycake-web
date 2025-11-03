import {
  Badge,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from 'react-bootstrap'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faCreditCard,
  faEnvelopeOpen,
  faFile,
  faMessage,
  faUser,
} from '@fortawesome/free-regular-svg-icons'
import { PropsWithChildren } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faGear, faListCheck, faLock, faPowerOff,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import HeaderLogout from '@/components/Layout/Dashboard/Header/HeaderLogout'
import { authOptions } from '@/app/api/auth/options'

import { getDictionary } from '@/locales/dictionary'

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

		</Nav>
  	)
}
