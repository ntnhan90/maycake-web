'use client'
import { useAccountProfile } from '@/queries/useAccount'
import Link from 'next/link'
import { DropdownItem } from 'react-bootstrap';
import { PropsWithChildren } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

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
export default function DropdownLink() {
    const {data} = useAccountProfile();
    const account = data?.payload

    return(
        <Link href={`/admin/systems/users/${account?.id}`} passHref legacyBehavior>
            <DropdownItem>
                <ItemWithIcon icon={faUser}>Profile</ItemWithIcon>
            </DropdownItem>
        </Link>
    )
}
