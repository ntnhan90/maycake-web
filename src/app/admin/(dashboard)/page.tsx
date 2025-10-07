//import node module libraries
import { Fragment } from "react";
import { Metadata } from "next";
import { Col, Row } from "react-bootstrap";

//import custom components
import DashboardStats from "@/components/dashboard/DashboardStats";


export default function AdminHome(){
    return (
        <Fragment>
            <Row className="g-6 mb-6">
                <DashboardStats />
            </Row>
        </Fragment>
    )
}