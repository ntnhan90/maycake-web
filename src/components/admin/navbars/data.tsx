import { v4 as uuid } from 'uuid';

const DashboardMenu = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'fas fa-home',
		link: '/admin/dashboard'
	},
    {
		id: uuid(),
		title: 'Ecommerce',
		icon: 'fas fa-shopping-bag',
	//	link: '/order',
		children: [
			{ id: uuid(), link: '/admin/ecommerce/orders', name: 'Orders', icon: 'fas fa-truck', },
			{ id: uuid(), link: '/admin/ecommerce/invoices', name: 'Invoices',icon:"fas fa-circle"},
			{ id: uuid(), link: '/admin/ecommerce/products', name: 'Products' ,icon:"fas fa-circle"},
			{ id: uuid(), link: '/admin/ecommerce/product-categories', name: 'Product Categories',icon:"fas fa-circle"},
			{ id: uuid(), link: '/admin/ecommerce/product-tags', name: 'Product Tags',icon:"fas fa-circle"},
			{ id: uuid(), link: '/admin/ecommerce/product-attributes', name: 'Product Attributes',icon:"fas fa-circle"},
			{ id: uuid(), link: '/admin/ecommerce/product-collections', name: 'Product Collections',icon: 'fas fa-database',},
			{ id: uuid(), link: '/admin/ecommerce/product-labels', name: 'Product Labels',icon: 'fas fa-tags',},
		//	{ id: uuid(), link: '/admin/ecommerce/brands', name: 'Brands',icon: 'fas fa-registered',},
			{ id: uuid(), link: '/admin/ecommerce/reviews', name: 'Reviews',icon:"fas fa-circle"},
			{ id: uuid(), link: '/admin/ecommerce/flash-sale', name: 'Flash sale', icon: "fas fa-bolt"},
			{ id: uuid(), link: '/admin/ecommerce/discount', name: 'Discount', icon: "fas fa-bolt"},
			{ id: uuid(), link: '/admin/ecommerce/customers', name: 'Customers', icon: "fas fa-users"},
		]
	},
    {
		id: uuid(),
		title: 'Pages',
		icon: 'fas fa-file',
		link: '/admin/pages'
	},
    {
		id: uuid(),
		title: 'Blogs',
		icon: 'fas fa-newspaper',
		children: [
			{ id: uuid(), link: '/admin/blog/posts', name: 'Post' ,icon:"fas fa-file"},
			{ id: uuid(), link: '/admin/blog/categories', name: 'Categories', icon:"fas fa-folder"},
			{ id: uuid(), link: '/admin/blog/tags', name: 'Tags' ,icon:"fas fa-tag"},
		]
	},
    {
		id: uuid(),
		title: 'Payments',
		icon: 'fas fa-money-check-alt',
		children: [
			{ id: uuid(), link: '/admin/payments/method', name: 'Payments Methods' ,icon:"fas fa-circle"},
		]
	},
    {
		id: uuid(),
		title: 'Contacts',
		icon: 'fas fa-id-card',
		link: '/admin/contacts'
	},
	{
		id: uuid(),
		title: 'Media',
		icon: 'fas fa-folder',
		link: '/admin/media'
	},
	{
		id: uuid(),
		title: 'Tools',
		icon: 'fas fa-wrench',
		children: [
			{ id: uuid(), link: '/admin/tools/data', name: 'Export/Import' ,icon:"fas fa-file-export"},
		]
	},
	{
		id: uuid(),
		title: 'Calendar',
		icon: 'fas fa-calendar-alt',
		link: '/admin/calendar'
	},
	{
		id: uuid(),
		title: 'Settings',
		icon: 'fas fa-cogs',
		link: '/admin/settings'
	},
	{
		id: uuid(),
		title: 'System',
		icon: 'fas fa-user-shield',
		link: '/admin/system'
	},
	{
		id: uuid(),
		title: 'Login',
		icon: 'fas fa-user-shield',
		link: '/admin/login'
	},
	{
		id: uuid(),
		title: 'LAYOUTS & PAGES',
		grouptitle: true
	},
];

export default DashboardMenu