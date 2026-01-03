import { Container } from 'react-bootstrap'
import React from 'react'
import '@/styles/style.css'
import FHeader from "@/components/Layout/frontend/header/page";
import FFooter from "@/components/Layout/frontend/footer/page";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
        <FHeader />
        {children}
        <FFooter />
    </main>
  )
}
