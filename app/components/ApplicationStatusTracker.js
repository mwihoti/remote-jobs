import React, { useState, useEffect } from 'react';
import { Card, Spin, message } from 'antd';

const ApplicationStatusTracker = ({ applicationId }) => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchStatus = async () => {
        try {
          const response = await fetch(`/api/application-status/${applicationId}`);
          if (response.ok) {
            const data = await response.json();
            setStatus(data.status);
          } else {
            throw new Error('Failed to fetch application status');
          }
        } catch (error) {
          console.error('Error fetching application status:', error);
          message.error('Failed to fetch application status. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchStatus();
    }, [applicationId]);
  
    if (loading) {
      return <Spin />;
    }
  
    return (
      <Card title="Application Status">
        <p>Application ID: {applicationId}</p>
        <p>Status: {status}</p>
      </Card>
    );
  };
  
  export default ApplicationStatusTracker;