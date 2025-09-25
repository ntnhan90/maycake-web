import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { usePathname } from 'next/navigation'

const BreadcrumbExample = () => {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <div className="page-header">
            <Breadcrumb className='mb-3'>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
}

export default BreadcrumbExample;