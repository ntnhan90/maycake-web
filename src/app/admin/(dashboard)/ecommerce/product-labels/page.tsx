
import {use} from 'react';
import React from 'react'
import { newResource, ResourceCollection } from '@/models/resource'
import serverFetch from '@/utils/server-fetch'
import { SearchParams } from '@/types/next'
import LabelsLists from './LabelsLists';
import { Metadata } from 'next';

export default function EcomLabelsPage() {
    console.log("params")
    return (
        <LabelsLists />
    );
}