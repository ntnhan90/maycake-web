import React from 'react'
import Link from 'next/link'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faArrowUp
} from "@fortawesome/free-solid-svg-icons"

export default function FFooter() {
    return (
        <>
            <Container fluid className="text-center align-items-center flex-column flex-md-row d-flex justify-content-between">
            </Container>
            <Link href="#" className=" btn-pri border-inner py-3 fs-4 back-to-top">
                <FontAwesomeIcon className="nav-icon ms-n3" icon={faArrowUp} />
            </Link>
        </>
    )
}
