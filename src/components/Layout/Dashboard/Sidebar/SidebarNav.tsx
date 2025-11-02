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
    faUserGear
} from '@fortawesome/free-solid-svg-icons'
import { faCcPaypal } from '@fortawesome/free-brands-svg-icons'
import { PropsWithChildren } from 'react'
import { Badge } from 'react-bootstrap'
import SidebarNavGroup from '@/components/Layout/Dashboard/Sidebar/SidebarNavGroup'
import SidebarNavItem from '@/components/Layout/Dashboard/Sidebar/SidebarNavItem'
import { getDictionary } from '@/locales/dictionary'
import {useLocale, useTranslations} from 'next-intl';

const SidebarNavTitle = (props: PropsWithChildren) => {
    const { children } = props

    return (
        <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
    )
}

export default function SidebarNav() {
    
    const t = useTranslations('sidebar');
    
    return (
        <ul className="list-unstyled">
            <SidebarNavItem icon={faHome} href="/admin">
                {t('items.dashboard')}
                <small className="ms-auto"><Badge bg="info" className="ms-auto">NEW</Badge></small>
            </SidebarNavItem>
            <SidebarNavItem icon={faCode} href="/admin/pokemons">
                {t('items.sample')}
                <small className="ms-auto"><Badge bg="danger" className="ms-auto">DEMO</Badge></small>
            </SidebarNavItem>

            <SidebarNavGroup toggleIcon={faCartPlus} toggleText= {t('items.ecommerce')}>
                <SidebarNavItem href="/admin/ecommerce/reports" icon={faChartArea}>{t('items.reports')} </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/orders" icon={faBasketShopping}>{t('items.orders')}  </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/products" icon={faCube}>{t('items.products')} </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/product-categories" icon={faArchive}>{t('items.products_categories')}  </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/product-tags" icon={faTag}>{t('items.products_tags')}   </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/product-attributes" icon={faGrip}>{t('items.products_atributes')}   </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/product-collections" icon={faGrip}>{t('items.products_collections')}   </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/product-labels" icon={faTags}>{t('items.products_labels')} </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/reviews" icon={faFile}> {t('items.reviews')}   </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/discounts" icon={faPercent}>{t('items.discounts')}   </SidebarNavItem>
                <SidebarNavItem href="/admin/ecommerce/customers" icon={faUsers}>{t('items.customers')} </SidebarNavItem>
            </SidebarNavGroup>

            <SidebarNavGroup toggleIcon={faNewspaper} toggleText= {t('items.blog')}>
                <SidebarNavItem href="/admin/blog/posts">{t('items.posts')}</SidebarNavItem>
                <SidebarNavItem href="/admin/blog/categoroes">{t('items.blog_categories')}</SidebarNavItem>
                <SidebarNavItem href="/admin/blog/tags">{t('items.blog_tag')}</SidebarNavItem>
            </SidebarNavGroup>

            <SidebarNavItem icon={faCcPaypal} href="/admin/payments">{t('items.payments')} </SidebarNavItem>

            <SidebarNavItem icon={faEnvelope} href="/admin/contact">{t('items.contact')} </SidebarNavItem>

            <SidebarNavGroup toggleIcon={faFileLines} toggleText= {t('items.faqs')}>
                <SidebarNavItem href="/admin/faqs">{t('items.faqs')}</SidebarNavItem>
                <SidebarNavItem href="/admin/faqs/categories">{t('items.faqs_categories')}</SidebarNavItem>
            </SidebarNavGroup>

            <SidebarNavItem icon={faImage} href="/admin/media">{t('items.media')} </SidebarNavItem>
            <SidebarNavItem icon={faGear} href="/admin/settings">{t('items.settings')} </SidebarNavItem>
            <SidebarNavItem icon={faUserGear} href="/admin/system">{t('items.admin')} </SidebarNavItem>

            <SidebarNavTitle>{t('items.extras')}</SidebarNavTitle>
            <SidebarNavGroup toggleIcon={faStar} toggleText={t('items.pages')} >
                <SidebarNavItem icon={faRightToBracket} href="login">{t('items.login')} </SidebarNavItem>
                <SidebarNavItem icon={faAddressCard} href="register">{t('items.register')} </SidebarNavItem>
                <SidebarNavItem icon={faBug} href="#">{t('items.error404')} </SidebarNavItem>
                <SidebarNavItem icon={faBug} href="#">{t('items.error500')} </SidebarNavItem>
            </SidebarNavGroup>
            <SidebarNavItem icon={faFileLines} href="#">{t('items.docs')}</SidebarNavItem>
            
            {/*

            <SidebarNavItem icon={faUserGear} href="#">
                {dict.sidebar.items.admin}
                <small className="ms-auto"><Badge bg="info">NEW</Badge></small>
            </SidebarNavItem>


             */}
        </ul>
    )
}
