import { Col, Row } from 'react-bootstrap'
import LoginForm from './loginForm'
import { SearchParams } from '@/types/next'
import { getDictionary } from '@/locales/dictionary'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Login Admin",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};


export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
    const { callbackUrl } = searchParams
    const dict = await getDictionary()

    const getCallbackUrl = () => {
        if (!callbackUrl) {
            return '/admin' // Default redirect to home page
        }

        return callbackUrl.toString()
    }

    return (
        <Row className="justify-content-center align-items-center px-3">
            <Col lg={8}>
                <Row>
                    <Col md={12} className="bg-white dark:bg-dark border p-5">
                        <div>
                            <h1>{dict.login.title}</h1>
                            <p className="text-black-50 dark:text-gray-500">{dict.login.description}</p>

                            <LoginForm  />
                        </div>
                </Col>
               
                </Row>
            </Col>
        </Row>
    )
}
