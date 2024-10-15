'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Button, Input, Form, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';
import { saveApplication } from '../../lib/applicationUtils';


const JobApplicationForm = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();
    const [job, setJob] = useState(null);
    const [jobId, setJobId] = useState(null); // State for jobId
    const [form] = Form.useForm();
    const [userId, setUserId] = useState(null); 
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetch(`/api/jobs/${id}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(data => {
                    console.log('Fetched job details for application:', data);
                    setJob(data);
                    setJobId(data.id)
                })
                .catch(err => {
                    console.error('Error fetching job details:', err);
                    message.error('Could not fetch job details. Please try again later.');
                });
        }
    }, [id]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('phone', values.phone);
            formData.append('jobId', jobId);
            formData.append('userId', userId);

            if (fileList.length > 0) {
                formData.append('cv', fileList[0].originFileObj);
            }

            const response = await fetch('/api/applications', {
                method: 'POST',
                body: formData,
            });

            const responseText = await response.text();
            console.log('Raw server response:', responseText);

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                throw new Error('Invalid JSON response from server');
            }

            if (response.ok) {
               
                message.success('Application submitted successfully!');
                form.resetFields();
                setFileList([]);
                router.push('/');
            } else {
                console.error('Server responded with an error:', data);
                message.error(`Failed to submit application: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            message.error(`An error occurred: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const beforeUpload = (file) => {
        const isPDF = file.type === 'application/pdf';
        if (!isPDF) {
            message.error('You can only upload PDF files!');
        }
        return isPDF || Upload.LIST_IGNORE;
    };

    const handleChange = (info) => {
        setFileList(info.fileList.slice(-1));
    };

    if (!job) {
        return <div>Loading job details...</div>;
    }

    return (
        <div className="flex  md:flex-row p-10 items-center justify-center gap-8">
            <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Job Details</h2>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <p className="mb-2"><strong>Company:</strong> {job.company || 'Not specified'}</p>
                    <p className="mb-2"><strong>Location:</strong> {job.location || 'Not specified'}</p>
                    <p className="mb-2"><strong>Salary:</strong> {job.salary || 'Not specified'}</p>
                    <p className="mb-4"><strong>Description:</strong> {job.description}</p>
                    <p className="mb-2"><strong>Responsibilities:</strong> {job.responsibilities}</p>
      <p className="mb-2"><strong>Role Summary:</strong> {job.roleSummary}</p>
      <p className="mb-2"><strong>Business Intro:</strong> {job.businessIntro}</p>
      <p className="mb-2"><strong>Preferred Qualifications:</strong> {job.preferredQualifications}</p>
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Application Form</h2>
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="cv" label="CV (PDF)" rules={[{ required: true }]}>
                        <Upload
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            fileList={fileList}
                        >
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit Application
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default JobApplicationForm;