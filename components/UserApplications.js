// File: components/UserApplications.js
'use client'
import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { getUserApplications } from '../lib/applicationUtils';

const UserApplications = ({ userId }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const userApplications = await getUserApplications(userId);
                setApplications(userApplications);
            } catch (error) {
                console.error('Error fetching applications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [userId]);

    const columns = [
        {
            title: 'Job Title',
            dataIndex: ['job', 'title'],
            key: 'jobTitle',
        },
        {
            title: 'Company',
            dataIndex: ['job', 'company'],
            key: 'company',
        },
        {
            title: 'Applied On',
            dataIndex: 'createdAt',
            key: 'appliedOn',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'PENDING' ? 'blue' : status === 'ACCEPTED' ? 'green' : 'red'}>
                    {status}
                </Tag>
            ),
        },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Applications</h2>
            <Table
                columns={columns}
                dataSource={applications}
                rowKey="id"
                loading={loading}
            />
        </div>
    );
};

export default UserApplications;