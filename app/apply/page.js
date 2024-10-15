'use client';

import { useRouter } from 'next/navigation';
import JobApplicationForm from '../components/JobApplicationForm';
import {  useState } from 'react';
export const dynamic = 'force-dynamic'

export default function Apply() {
   
   
    return <JobApplicationForm />;
}