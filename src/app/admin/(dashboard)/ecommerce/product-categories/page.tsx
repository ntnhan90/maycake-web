import CategoryTable from "./cateTable";
import { Metadata } from 'next';
import {  Container } from 'react-bootstrap';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Product Cate Admin",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CategoryManager() {
 


    return (
        <>
        <CategoryTable/>
        </>
    );
}
