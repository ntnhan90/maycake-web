import { Metadata } from 'next';
import BlogCategoryManager from './blogCateTable';
export const metadata: Metadata = {
    title: "Blog Cate Admin",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};


export default function AdminBlogCategoriesPage() {
    return (
        <>
        <BlogCategoryManager/>
        </>
    );
}