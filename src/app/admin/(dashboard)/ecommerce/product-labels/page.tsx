import React from 'react'
import Lists from './lists';
import { Metadata } from 'next';
import { ProLabelListResType } from '@/models/product/labelsModels';
import labelsApiRequest from '@/apiRequests/product/labelsApi';

export const metadata: Metadata = {
    title: "Post List | Dasher - Responsive Bootstrap 5 Admin Dashboard",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default async function EcomLabelsPage() {
/*
    let labelList : ProLabelListResType['data'] = []
    let pagi;
    try {
        const result = await labelsApiRequest.list()
        const {
            payload: { data , pagination}
        } = result
        labelList = data
        pagi = pagination
        console.log(pagi)
    } catch (error) {
        console.log(error)
        return <div>Something went wrong</div>
    }
  */
    return (
        <>
            <Lists />
        </>
    );
}