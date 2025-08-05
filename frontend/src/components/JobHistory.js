import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Modal,
  Timeline,
  Progress,
  Statistic
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  EyeOutlined,
  DownloadOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const JobHistory = () => {
  const [jobHistory, setJobHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: null,
    search: ''
  });

  useEffect(() => {
    loadJobHistory();
  }, [filters]);

  const loadJobHistory = () => {
    setLoading(true);
    
    // Mock data
    setTimeout(() => {
      const mockHistory = [
        {
          id: 1,
          jobName: 'Faculty Data Sync',
          status: 'success',
          startTime: '2024-01-15 10:30:00',
          endTime: '2024-01-15 10:32:15',
          duration: '2m 15s',
          recordsProcessed: 1250,
          recordsSuccessful: 1250,
          recordsFailed: 0,
          source: 'MySQL Faculty DB',
          destination: 'Data Warehouse',
          triggeredBy: 'auto',
          logs: [
            { time: '10:30:00', level: 'INFO', message: 'Job started' },
            { time: '10:30:15', level: 'INFO', message: 'Connected to MySQL Faculty DB' },
            { time: '10:30:30', level: 'INFO', message: 'Extracting faculty records...' },
            { time: '10:31:45', level: 'INFO', message: 'Transforming data...' },
            { time: '10:32:00', level: 'INFO', message: 'Loading to Data Warehouse...' },
            { time: '10:32:15', level: 'SUCCESS', message: 'Job completed successfully' }
          ]
        },
        {
          id: 2,
          jobName: 'Research Papers ETL',
          status: 'success',
          startTime: '2024-01-15 09:15:00',
          endTime: '2024-01-15 09:17:30',
          duration: '2m 30s',
          recordsProcessed: 890,
          recordsSuccessful: 890,
          recordsFailed: 0,
          source: 'MongoDB Research',
          destination: 'Analytics DB',
          triggeredBy: 'manual',
          logs: [
            { time: '09:15:00', level: 'INFO', message: 'Job started by user' },
            { time: '09:15:10', level: 'INFO', message: 'Connected to MongoDB Research' },
            { time: '09:15:25', level: 'INFO', message: 'Extracting research papers...' },
            { time: '09:16:50', level: 'INFO', message: 'Applying transformations...' },
            { time: '09:17:20', level: 'INFO', message: 'Loading to Analytics DB...' },
            { time: '09:17:30', level: 'SUCCESS', message: 'Job completed successfully' }
          ]
        },
        {
          id: 3,
          jobName: 'Student Records Migration',
          status: 'error',
          startTime: '2024-01-15 08:00:00',
          endTime: '2024-01-15 08:00:45',
          duration: '45s',
          recordsProcessed: 0,
          recordsSuccessful: 0,
          recordsFailed: 0,
          source: 'Legacy System',
          destination: 'New Student DB',
          triggeredBy: 'auto',
          logs: [
            { time: '08:00:00', level: 'INFO', message: 'Job started' },
            { time: '08:00:15', level: 'ERROR', message: 'Failed to connect to Legacy System' },
            { time: '08:00:30', level: 'ERROR', message: 'Connection timeout after 30 seconds' },
            { time: '08:00:45', level: 'ERROR', message: 'Job failed: Unable to establish connection' }
          ]
        },
        {
          id: 4,
          jobName: 'Faculty Data Sync',
          status: 'success',
          startTime: '2024-01-14 10:30:00',
          endTime: '2024-01-14 10:31:55',
          duration: '1m 55s',
          recordsProcessed: 1245,
          recordsSuccessful: 1240,
          recordsFailed: 5,
          source: 'MySQL Faculty DB',
          destination: 'Data Warehouse',
          triggeredBy: 'auto',
          logs: [
            { time: '10:30:00', level: 'INFO', message: 'Job started' },
            { time: '10:30:15', level: 'INFO', message: 'Connected to MySQL Faculty DB' },
            { time: '10:30:30', level: 'INFO', message: 'Extracting faculty records...' },
            { time: '10:31:20', level: 'WARNING', message: '5 records failed validation' },
            { time: '10:31:45', level: 'INFO', message: 'Loading to Data Warehouse...' },
            { time: '10:31:55', level: 'SUCCESS', message: 'Job completed with warnings' }
          ]
        },
        {
          id: 5,
          jobName: 'Department Data Refresh',
          status: 'running',
          startTime: '2024-01-15 11:00:00',
          endTime: null,
          duration: '5m 30s',
          recordsProcessed: 45,
          recordsSuccessful: 42,
          recordsFailed: 0,
          source: 'HR System',
          destination: 'Analytics DB',
          triggeredBy: 'manual',
          logs: [
            { time: '11:00:00', level: 'INFO', message: 'Job started by user' },
            { time: '11:00:10', level: 'INFO', message: 'Connected to HR System' },
            { time: '11:00:25', level: 'INFO', message: 'Extracting department data...' },
            { time: '11:03:15', level: 'INFO', message: 'Processing records...' },
            { time: '11:05:30', level: 'INFO', message: 'Still processing...' }
          ]
        }
      ];
      
      setJobHistory(mockHistory);
      setLoading(false);
    }, 500);
  };

  const columns = [
    {
      title: 'Job Name',
      dataIndex: 'jobName',
      key: 'jobName',
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          success: { color: 'green', icon: <CheckCircleOutlined />, text: 'SUCCESS' },
          error: { color: 'red', icon: <CloseCircleOutlined />, text: 'ERROR' },
          running: { color: 'blue', icon: <PlayCircleOutlined />, text: 'RUNNING' },
          pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'PENDING' }
        };
        const config = statusConfig[status] || statusConfig.pending;
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (time) => moment(time).format('MMM DD, YYYY HH:mm:ss'),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Records Processed',
      dataIndex: 'recordsProcessed',
      key: 'recordsProcessed',
      render: (count) => count?.toLocaleString() || '0',
    },
    {
      title: 'Success Rate',
      key: 'successRate',
      render: (_, record) => {
        if (record.recordsProcessed === 0) return 'N/A';
        const rate = (record.recordsSuccessful / record.recordsProcessed) * 100;
        return (
          <Progress
            percent={Math.round(rate)}
            size="small"
            status={rate === 100 ? 'success' : rate > 80 ? 'active' : 'exception'}
          />
        );
      },
    },
    {
      title: 'Triggered By',
      dataIndex: 'triggeredBy',
      key: 'triggeredBy',
      render: (type) => (
        <Tag color={type === 'auto' ? 'blue' : 'green'}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewDetails(record)}
          >
            Details
          </Button>
          <Button
            icon={<DownloadOutlined />}
            size="small"
            onClick={() => handleDownloadLogs(record)}
          >
            Logs
          </Button>
        </Space>
      ),
    },
  ];

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setDetailModalVisible(true);
  };

  const handleDownloadLogs = (job) => {
    const logContent = job.logs.map(log => 
      `${job.startTime.split(' ')[0]} ${log.time} [${log.level}] ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${job.jobName}_${job.id}_logs.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredHistory = jobHistory.filter(job => {
    if (filters.status !== 'all' && job.status !== filters.status) return false;
    if (filters.search && !job.jobName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    // Add date range filtering logic here if needed
    return true;
  });

  const getLogIcon = (level) => {
    switch (level) {
      case 'SUCCESS':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'ERROR':
        return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'WARNING':
        return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      default:
        return <PlayCircleOutlined style={{ color: '#1890ff' }} />;
    }
  };

  return (
    <div>
      <h1>Job History</h1>
      
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Select
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
              style={{ width: '100%' }}
              placeholder="Filter by status"
            >
              <Option value="all">All Status</Option>
              <Option value="success">Success</Option>
              <Option value="error">Error</Option>
              <Option value="running">Running</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Input.Search
              placeholder="Search jobs..."
              allowClear
              onChange={(e) => handleFilterChange('search', e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <RangePicker
              onChange={(dates) => handleFilterChange('dateRange', dates)}
              style={{ width: '100%' }}
              placeholder={['Start Date', 'End Date']}
            />
          </Col>
          
          <Col xs={24} sm={12} md={4}>
            <Button
              icon={<ReloadOutlined />}
              onClick={loadJobHistory}
              loading={loading}
              style={{ width: '100%' }}
            >
              Refresh
            </Button>
          </Col>
        </Row>
      </Card>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title="Total Jobs"
                value={filteredHistory.length}
                prefix={<PlayCircleOutlined />}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Successful"
                value={filteredHistory.filter(j => j.status === 'success').length}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Failed"
                value={filteredHistory.filter(j => j.status === 'error').length}
                prefix={<CloseCircleOutlined />}
                valueStyle={{ color: '#cf1322' }}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Running"
                value={filteredHistory.filter(j => j.status === 'running').length}
                prefix={<PlayCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Col>
          </Row>
        </div>
        
        <Table
          columns={columns}
          dataSource={filteredHistory}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Card>

      {/* Job Details Modal */}
      <Modal
        title={`Job Details: ${selectedJob?.jobName}`}
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        width={800}
        footer={[
          <Button key="download" icon={<DownloadOutlined />} onClick={() => handleDownloadLogs(selectedJob)}>
            Download Logs
          </Button>,
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Close
          </Button>
        ]}
      >
        {selectedJob && (
          <div>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Records Processed"
                    value={selectedJob.recordsProcessed}
                    prefix={<PlayCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Success Rate"
                    value={selectedJob.recordsProcessed > 0 ? 
                      Math.round((selectedJob.recordsSuccessful / selectedJob.recordsProcessed) * 100) : 0}
                    suffix="%"
                    prefix={<CheckCircleOutlined />}
                    valueStyle={{ 
                      color: selectedJob.recordsSuccessful === selectedJob.recordsProcessed ? '#3f8600' : '#faad14' 
                    }}
                  />
                </Card>
              </Col>
            </Row>

            <div style={{ marginBottom: 16 }}>
              <h4>Job Information</h4>
              <p><strong>Source:</strong> {selectedJob.source}</p>
              <p><strong>Destination:</strong> {selectedJob.destination}</p>
              <p><strong>Start Time:</strong> {selectedJob.startTime}</p>
              <p><strong>End Time:</strong> {selectedJob.endTime || 'Still running...'}</p>
              <p><strong>Duration:</strong> {selectedJob.duration}</p>
              <p><strong>Triggered By:</strong> <Tag color={selectedJob.triggeredBy === 'auto' ? 'blue' : 'green'}>{selectedJob.triggeredBy.toUpperCase()}</Tag></p>
            </div>

            <div>
              <h4>Execution Logs</h4>
              <Timeline>
                {selectedJob.logs.map((log, index) => (
                  <Timeline.Item
                    key={index}
                    dot={getLogIcon(log.level)}
                    color={log.level === 'ERROR' ? 'red' : log.level === 'SUCCESS' ? 'green' : 'blue'}
                  >
                    <div>
                      <span style={{ fontWeight: 500 }}>{log.time}</span>
                      <Tag color={log.level === 'ERROR' ? 'red' : log.level === 'SUCCESS' ? 'green' : log.level === 'WARNING' ? 'orange' : 'blue'} style={{ marginLeft: 8 }}>
                        {log.level}
                      </Tag>
                    </div>
                    <div style={{ marginTop: 4 }}>{log.message}</div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default JobHistory;
