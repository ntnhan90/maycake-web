import React from 'react'
import Lists from './lists';
import { Metadata } from 'next';
import { getLocale } from '@/locales/dictionary'

export const metadata: Metadata = {
    title: "Post List | Dasher - Responsive Bootstrap 5 Admin Dashboard",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default async function EcomLabelsPage() {
    
    return (
        <>
            <Lists />
        </>
    );
}