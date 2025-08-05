import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Tag,
  message,
  Steps,
  Row,
  Col,
  Divider,
  Progress,
  Alert
} from 'antd';
import {
  PlusOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SyncOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

const ETLJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRunModalVisible, setIsRunModalVisible] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Mock data
    setJobs([
      {
        id: 1,
        name: 'Faculty Data Sync',
        description: 'Sync faculty data from MySQL to warehouse',
        source: 'MySQL Faculty DB',
        destination: 'Data Warehouse',
        status: 'success',
        lastRun: '2024-01-15 10:30:00',
        nextRun: '2024-01-16 10:30:00',
        recordsProcessed: 1250,
        duration: '2m 15s'
      },
      {
        id: 2,
        name: 'Research Papers ETL',
        description: 'Extract and transform research papers from MongoDB',
        source: 'MongoDB Research',
        destination: 'Analytics DB',
        status: 'running',
        lastRun: '2024-01-15 11:00:00',
        nextRun: null,
        recordsProcessed: 750,
        duration: '1m 45s'
      },
      {
        id: 3,
        name: 'Student Records Migration',
        description: 'Migrate student records with data cleaning',
        source: 'Legacy System',
        destination: 'New Student DB',
        status: 'error',
        lastRun: '2024-01-15 09:15:00',
        nextRun: '2024-01-15 12:15:00',
        recordsProcessed: 0,
        duration: '0s'
      }
    ]);
  }, []);

  const columns = [
    {
      title: 'Job Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#999' }}>{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Source → Destination',
      key: 'flow',
      render: (_, record) => (
        <div>
          <div>{record.source}</div>
          <div style={{ textAlign: 'center', margin: '4px 0' }}>↓</div>
          <div>{record.destination}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const config = {
          success: { color: 'green', text: 'SUCCESS' },
          running: { color: 'blue', text: 'RUNNING' },
          error: { color: 'red', text: 'ERROR' },
          pending: { color: 'orange', text: 'PENDING' }
        };
        return (
          <Tag color={config[status]?.color || 'default'}>
            {config[status]?.text || status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Last Run',
      dataIndex: 'lastRun',
      key: 'lastRun',
    },
    {
      title: 'Records',
      dataIndex: 'recordsProcessed',
      key: 'recordsProcessed',
      render: (count) => count?.toLocaleString() || '0',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<PlayCircleOutlined />}
            size="small"
            type="primary"
            onClick={() => handleRunJob(record)}
            disabled={record.status === 'running'}
          >
            Run
          </Button>
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewJob(record)}
          >
            View
          </Button>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditJob(record)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const handleCreateJob = () => {
    setCurrentJob(null);
    form.resetFields();
    setCurrentStep(0);
    setIsModalVisible(true);
  };

  const handleRunJob = (job) => {
    setCurrentJob(job);
    setIsRunModalVisible(true);
    
    // Simulate job execution
    setTimeout(() => {
      setJobs(jobs.map(j => 
        j.id === job.id 
          ? { 
              ...j, 
              status: 'running',
              lastRun: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
          : j
      ));
      
      // Simulate job completion after 5 seconds
      setTimeout(() => {
        setJobs(prevJobs => prevJobs.map(j => 
          j.id === job.id 
            ? { 
                ...j, 
                status: 'success',
                recordsProcessed: Math.floor(Math.random() * 2000) + 500,
                duration: `${Math.floor(Math.random() * 3) + 1}m ${Math.floor(Math.random() * 60)}s`
              }
            : j
        ));
        setIsRunModalVisible(false);
        message.success(`Job "${job.name}" completed successfully!`);
      }, 5000);
    }, 1000);
  };

  const handleViewJob = (job) => {
    Modal.info({
      title: 'Job Details',
      width: 600,
      content: (
        <div>
          <p><strong>Name:</strong> {job.name}</p>
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Source:</strong> {job.source}</p>
          <p><strong>Destination:</strong> {job.destination}</p>
          <p><strong>Status:</strong> <Tag color={job.status === 'success' ? 'green' : job.status === 'error' ? 'red' : 'blue'}>{job.status.toUpperCase()}</Tag></p>
          <p><strong>Last Run:</strong> {job.lastRun}</p>
          <p><strong>Records Processed:</strong> {job.recordsProcessed?.toLocaleString()}</p>
          <p><strong>Duration:</strong> {job.duration}</p>
        </div>
      ),
    });
  };

  const handleEditJob = (job) => {
    setCurrentJob(job);
    form.setFieldsValue(job);
    setCurrentStep(0);
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    if (currentJob) {
      // Update existing job
      setJobs(jobs.map(j => j.id === currentJob.id ? { ...j, ...values } : j));
      message.success('Job updated successfully');
    } else {
      // Create new job
      const newJob = {
        id: Date.now(),
        ...values,
        status: 'pending',
        lastRun: null,
        nextRun: null,
        recordsProcessed: 0,
        duration: '0s'
      };
      setJobs([...jobs, newJob]);
      message.success('Job created successfully');
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const steps = [
    {
      title: 'Basic Info',
      content: (
        <>
          <Form.Item
            name="name"
            label="Job Name"
            rules={[{ required: true, message: 'Please enter job name' }]}
          >
            <Input placeholder="e.g., Faculty Data Sync" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={3} placeholder="Describe what this job does..." />
          </Form.Item>
        </>
      )
    },
    {
      title: 'Data Flow',
      content: (
        <>
          <Form.Item
            name="source"
            label="Source"
            rules={[{ required: true, message: 'Please select source' }]}
          >
            <Select placeholder="Select data source">
              <Option value="MySQL Faculty DB">MySQL Faculty DB</Option>
              <Option value="MongoDB Research">MongoDB Research</Option>
              <Option value="PostgreSQL Analytics">PostgreSQL Analytics</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="destination"
            label="Destination"
            rules={[{ required: true, message: 'Please select destination' }]}
          >
            <Select placeholder="Select destination">
              <Option value="Data Warehouse">Data Warehouse</Option>
              <Option value="Analytics DB">Analytics DB</Option>
              <Option value="CSV Export">CSV Export</Option>
            </Select>
          </Form.Item>
        </>
      )
    },
    {
      title: 'Configuration',
      content: (
        <>
          <Form.Item
            name="schedule"
            label="Schedule"
          >
            <Select placeholder="Select schedule (optional)">
              <Option value="manual">Manual Only</Option>
              <Option value="hourly">Every Hour</Option>
              <Option value="daily">Daily</Option>
              <Option value="weekly">Weekly</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="transformations"
            label="Transformations"
          >
            <TextArea rows={3} placeholder="Describe any data transformations needed..." />
          </Form.Item>
        </>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1>ETL Jobs</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateJob}>
          Create New Job
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={jobs}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Create/Edit Job Modal */}
      <Modal
        title={currentJob ? 'Edit ETL Job' : 'Create New ETL Job'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Steps current={currentStep} style={{ marginBottom: 24 }}>
          {steps.map(step => (
            <Step key={step.title} title={step.title} />
          ))}
        </Steps>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          {steps[currentStep].content}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <Button
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                  Next
                </Button>
              ) : (
                <Button type="primary" htmlType="submit">
                  {currentJob ? 'Update Job' : 'Create Job'}
                </Button>
              )}
            </Space>
          </div>
        </Form>
      </Modal>

      {/* Job Execution Modal */}
      <Modal
        title={`Running Job: ${currentJob?.name}`}
        visible={isRunModalVisible}
        onCancel={() => setIsRunModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsRunModalVisible(false)}>
            Close
          </Button>
        ]}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <SyncOutlined spin style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} />
          <h3>Job is running...</h3>
          <Progress percent={75} status="active" />
          <p style={{ marginTop: 16, color: '#666' }}>
            Processing records from {currentJob?.source} to {currentJob?.destination}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ETLJobs;
