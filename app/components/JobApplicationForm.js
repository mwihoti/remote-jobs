'use client'
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button, Input, Form, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const JobApplicationForm = () => {

    const [form] = Form.useForm();
    const { id } = useParams();

    const [fileList, setFileList] = useState([]);

    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('jobId', id);
        formData.append('cv', fileList[0].originFileObj);

        try {
            const response = await fetch('/api/apply', {
                method: 'POST',
                body: FormData,
            });
            if (response.ok) {
                message.success('Application submitted successfully!');
                form.resetFields();
                setFileList([]);

            } else {
                message.error('Failed to submit application. Please try again.');

            } }
            catch (error) {
                console.error('Error submitting application:', error);
      message.error('An error occurred. Please try again later.');
            }
        
    };

    const beforeUpload = (file) => {
        const isPDF = file.type === 'application/pdf';
        if (!isPDF) {
          message.error('You can only upload PDF files!');
        }
        return isPDF;
      };
    
      const handleChange = (info) => {
        setFileList(info.fileList.slice(-1));
      };

      return (
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
      );
    };
    
    export default JobApplicationForm;
