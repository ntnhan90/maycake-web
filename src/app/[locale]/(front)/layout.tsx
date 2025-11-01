import '@/styles/frontend/style.css'
import { Container } from 'react-bootstrap'

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <>
            <Container fluid="lg">
                {children}
            </Container>
        </>
    )
}