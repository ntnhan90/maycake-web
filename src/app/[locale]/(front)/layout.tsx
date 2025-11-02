import '@/styles/frontend/style.css'
import { Container } from 'react-bootstrap'
import FHeader from '@/components/Layout/Frontend/Header/FHeader';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <>
            <FHeader />
            <main className='main'>

            </main>
        </>
    )
}