'use client'
import React, { useState } from "react";
import { Button, Input, Form, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { saveApplication } from '../../lib/applicationUtils';

const JobApplicationForm = ({ job }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('jobId', job.id);
        formData.append('cv', fileList[0]?.originFileObj);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const applicationData = await response.json();
                await saveApplication(applicationData);
                message.success('Application submitted successfully!');
                form.resetFields();
                setFileList([]);
            } else {
                message.error('Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            message.error('An error occurred. Please try again later.');
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
        <div className="flex flex-col md:flex-row p-10 items-center justify-centergap-8">
            <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Job Details</h2>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <p className="mb-2"><strong>Company:</strong> {job.company || 'Not specified'}</p>
                    <p className="mb-2"><strong>Location:</strong> {job.location || 'Not specified'}</p>
                    <p className="mb-2"><strong>Salary:</strong> {job.salary || 'Not specified'}</p>
                    <p className="mb-4"><strong>Description:</strong> {job.description}</p>
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