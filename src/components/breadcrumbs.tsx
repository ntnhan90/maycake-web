"use client";

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";
import { capitalizedWord } from '@/lib/utils';

const BreadcrumbExample = () => {

    const path = usePathname();
    const router = useRouter();
    const pathSegments = path.split("/").filter((segment) => segment !== "");
    return (
        <div className="page-header">
            <Breadcrumb className='mb-3'>
                {
                    pathSegments.map((segment,index) =>
                        index === pathSegments.length - 1 ? (
                            <Breadcrumb.Item
                                as="li"
                                active
                                key={segment}
                                className="text-capitalize"
                            >
                                {capitalizedWord(segment)}
                            </Breadcrumb.Item>
                        ) :(
                            <Breadcrumb.Item as="li" key={segment}>
                                <span
                                onClick={() =>
                                    router.push(
                                    `/${pathSegments.slice(0, index + 1).join("/")}`
                                    )
                                }
                                >
                                {capitalizedWord(segment)}
                                </span>
                            </Breadcrumb.Item>
                        )
                    
                )}
            </Breadcrumb>
        </div>
    );
}

export default BreadcrumbExample;