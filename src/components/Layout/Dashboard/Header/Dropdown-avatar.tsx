'use client'
import {DropdownToggle} from 'react-bootstrap'
import { useAccountProfile } from '@/queries/useAccount'
import { mediaUrl } from '@/utils/lib'

export default function DropdownAvatar() {
    const {data} = useAccountProfile();

    const preview = data?.payload?.avatar 
        ? mediaUrl(data.payload.avatar)
        : "/img/team/team-1.jpg"
    return(
        <DropdownToggle variant="link" bsPrefix="hide-caret" className="py-0 px-2 rounded-0" id="dropdown-profile">
            <div className="avatar position-relative">
                 
                <img
                    src={preview}
                    className="img-fluid 12"
                    style={{ maxHeight: '100%' }}
                    />
            </div>
        </DropdownToggle>
    )
}
