import React from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import FHeader from '@/components/Layout/Frontend/Header/FHeader';
import FFooter from '@/components/Layout/Frontend/Footer/FFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/frontend/style.css'

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''

    return (
        <div className="main 2">
            <FHeader />
            {children}
            {gaMeasurementId !== '' && <GoogleAnalytics gaId={gaMeasurementId} />}
            <FFooter />
        </div>
    )
}
