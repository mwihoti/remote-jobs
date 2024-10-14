'use client'
import React, { useState } from 'react';

export default function JobForm() {
    // Existing states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    
    // New states for the additional fields
    const [qualifications, setQualifications] = useState('');
    const [benefits, setBenefits] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [companyBackground, setCompanyBackground] = useState('');
    const [applicationProcedure, setApplicationProcedure] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [roleSummary, setRoleSummary] = useState('');
    const [businessIntro, setBusinessIntro] = useState('');
    const [preferredQualifications, setPreferredQualifications] = useState('');
    const [applicationDirections, setApplicationDirections] = useState('');
    const [internalAdvertising, setInternalAdvertising] = useState('');
    const [socialMedia, setSocialMedia] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    salary,
                    company,
                    location,
                    qualifications,
                    benefits,
                    contactInfo,
                    companyBackground,
                    applicationProcedure,
                    responsibilities,
                    roleSummary,
                    businessIntro,
                    preferredQualifications,
                    applicationDirections,
                    internalAdvertising,
                    socialMedia
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create job');
            }

            const result = await response.json();
            console.log('Job created:', result);

            // Clear form after submission
            setTitle('');
            setDescription('');
            setSalary('');
            setCompany('');
            setLocation('');
            setQualifications('');
            setBenefits('');
            setContactInfo('');
            setCompanyBackground('');
            setApplicationProcedure('');
            setResponsibilities('');
            setRoleSummary('');
            setBusinessIntro('');
            setPreferredQualifications('');
            setApplicationDirections('');
            setInternalAdvertising('');
            setSocialMedia('');

            alert('Job created successfully!');
        } catch (error) {
            console.error('Error creating job:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            {/* Additional Fields */}
            <div>
                <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700">Required Qualifications</label>
                <textarea
                    id="qualifications"
                    value={qualifications}
                    onChange={(e) => setQualifications(e.target.value)}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">Benefits</label>
                <textarea
                    id="benefits"
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">Contact Information</label>
                <input
                    type="text"
                    id="contactInfo"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="companyBackground" className="block text-sm font-medium text-gray-700">Company Background</label>
                <textarea
                    id="companyBackground"
                    value={companyBackground}
                    onChange={(e) => setCompanyBackground(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label htmlFor="applicationProcedure" className="block text-sm font-medium text-gray-700">Application Procedure</label>
                <textarea
                    id="applicationProcedure"
                    value={applicationProcedure}
                    onChange={(e) => setApplicationProcedure(e.target.value)}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            {/* Continue adding similar form fields for all other states... */}

            {error && <div className="text-red-500">{error}</div>}
            <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
                {loading ? 'Creating...' : 'Create Job'}
            </button>
        </form>
    );
}
