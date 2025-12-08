import {
    faAddressCard, 
    faFileLines, 
    faStar,
} from '@fortawesome/free-regular-svg-icons'
import {
    faHome,
    faBug,
    faCode,
    faRightToBracket,
    faCartPlus,
    faChartArea,
    faBasketShopping,
    faCube,
    faArchive,
    faTag,
    faTags,
    faGrip,
    faUsers,
    faFile,
    faPercent,
    faNewspaper,
    faEnvelope,
    faImage,
    faGear,
    faUserGear,
} from '@fortawesome/free-solid-svg-icons'
import { faCcPaypal } from '@fortawesome/free-brands-svg-icons'
import React, { PropsWithChildren } from 'react'
import { Badge } from 'react-bootstrap'
import SidebarNavGroup from '@/components/Layout/Dashboard/Sidebar/SidebarNavGroup'
import SidebarNavItem from '@/components/Layout/Dashboard/Sidebar/SidebarNavItem'
import { getDictionary } from '@/locales/dictionary'

const SidebarNavTitle = (props: PropsWithChildren) => {
    const { children } = props

    return (
        <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
    )
}

export default async function SidebarNav() {
    const dict = await getDictionary()
    return (
        <ul className="list-unstyled">
            <SidebarNavItem icon={faHome} href="/admin">
                {dict.sidebar.items.dashboard}
                <small className="ms-auto"><Badge bg="info" className="ms-auto">NEW</Badge></small>
            </SidebarNavItem>

            <SidebarNavGroup toggleIcon={faCartPlus} toggleText={dict.sidebar.items.ecommerce}>
                <SidebarNavItem href="/admin/ecommerce/reports" icon={faChartArea}>{dict.sidebar.items.reports}</SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/orders" icon={faBasketShopping}>{dict.sidebar.items.orders} </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/products" icon={faCube}> {dict.sidebar.items.products}</SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/product-categories" icon={faArchive}>{dict.sidebar.items.products_categories}</SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/product-tags" icon={faTag}>{dict.sidebar.items.products_tags} </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/product-attributes" icon={faGrip}> {dict.sidebar.items.products_atributes} </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/product-collections" icon={faGrip}> {dict.sidebar.items.products_collections} </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/product-labels" icon={faTags}>{dict.sidebar.items.products_labels}</SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/reviews" icon={faFile}>   {dict.sidebar.items.reviews} </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/discounts" icon={faPercent}>{dict.sidebar.items.discounts}  </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/customers" icon={faUsers}> {dict.sidebar.items.customers}</SidebarNavItem>
            </SidebarNavGroup>

            <SidebarNavGroup toggleIcon={faNewspaper} toggleText= {dict.sidebar.items.blog}>
                <SidebarNavItem href="/admin/blog/posts">{dict.sidebar.items.posts}</SidebarNavItem>
                <SidebarNavItem href="/admin/blog/categories">{dict.sidebar.items.blog_categories}</SidebarNavItem>
                <SidebarNavItem href="/admin/blog/tags">{dict.sidebar.items.blog_tag}</SidebarNavItem>
            </SidebarNavGroup>

            <SidebarNavItem icon={faCcPaypal} href="/admin/payments"> {dict.sidebar.items.payments}</SidebarNavItem>

            <SidebarNavItem icon={faEnvelope} href="/admin/contact"> {dict.sidebar.items.contact}</SidebarNavItem>

            <SidebarNavGroup toggleIcon={faFileLines} toggleText={dict.sidebar.items.faqs}>
                <SidebarNavItem href="/admin/faqs"> {dict.sidebar.items.faqs}</SidebarNavItem>
                <SidebarNavItem href="/admin/faqs-categories">{dict.sidebar.items.faqs_categories}</SidebarNavItem>
            </SidebarNavGroup>

            <SidebarNavItem icon={faImage} href="/admin/media"> {dict.sidebar.items.media}</SidebarNavItem>
            <SidebarNavItem icon={faGear} href="/admin/settings"> {dict.sidebar.items.settings}</SidebarNavItem>
            <SidebarNavItem icon={faUserGear} href="/admin/systems">{dict.sidebar.items.admin}</SidebarNavItem>

            <SidebarNavTitle>{dict.sidebar.items.extras}</SidebarNavTitle>
            <SidebarNavGroup toggleIcon={faStar} toggleText={dict.sidebar.items.pages}>
                <SidebarNavItem icon={faRightToBracket} href="login"> {dict.sidebar.items.login}</SidebarNavItem>
                <SidebarNavItem icon={faAddressCard} href="register"> {dict.sidebar.items.register}</SidebarNavItem>
                <SidebarNavItem icon={faBug} href="#"> {dict.sidebar.items.error404}</SidebarNavItem>
                <SidebarNavItem icon={faBug} href="#">{dict.sidebar.items.error500}</SidebarNavItem>
            </SidebarNavGroup>
            <SidebarNavItem icon={faFileLines} href="#"> {dict.sidebar.items.docs}</SidebarNavItem>
        </ul>
    )
}
