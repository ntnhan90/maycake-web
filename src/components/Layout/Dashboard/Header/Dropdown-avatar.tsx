'use client'
import {DropdownToggle} from 'react-bootstrap'
import { useAccountProfile } from '@/queries/useAccount'

export default function DropdownAvatar() {
    const {data} = useAccountProfile();
    const account = data?.payload
    return(
        <DropdownToggle variant="link" bsPrefix="hide-caret" className="py-0 px-2 rounded-0" id="dropdown-profile">
            <div className="avatar position-relative">
                {account?.username}
            </div>
        </DropdownToggle>
    )
}
