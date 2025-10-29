import {
  Card, CardBody, Col, Row,
} from 'react-bootstrap'
import { getDictionary } from '@/locales/dictionary'

export default async function HomePage() {
    const dict = await getDictionary()

    return (
        <Row className="justify-content-center">
            <Col md={6}>
                <Card className="mb-4 rounded-0">
                <CardBody className="p-4">
                    <h1>{dict.signup.title}</h1>
                    <p className="text-black-50 dark:text-gray-500">1</p>
                </CardBody>
                </Card>
            </Col>
        </Row>
    )
}