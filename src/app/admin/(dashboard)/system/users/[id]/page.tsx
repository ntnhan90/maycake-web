 "use client"
import { Container,Tabs, Tab, Card, CardHeader } from "react-bootstrap"
import BreadcrumbExample from "@/components/breadcrumbs";

export default function AdminCreateUsers(){
    return (
        <Container>
            <div className="row">
                <h1 className="mb-3 h2">User</h1>
                <BreadcrumbExample />
            </div>
            <Card>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="User Profiel" title="User Profile" active>
                        Tab content for User Profie
                    </Tab>
                    <Tab eventKey="Avatar" title="Avatar">
                        Tab content for Avatar
                    </Tab>
                    <Tab eventKey="Change Password" title="Change Password">
                        Tab content for Change Password
                    </Tab>
                </Tabs>
            </Card>
        </Container>
    )
}
 