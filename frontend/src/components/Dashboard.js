import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Progress, Timeline, Button, Alert } from 'antd';
import {
  DatabaseOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    successfulJobs: 0,
    failedJobs: 0,
    runningJobs: 0,
    dataSources: 0
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [jobTrends, setJobTrends] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalJobs: 45,
      successfulJobs: 38,
      failedJobs: 5,
      runningJobs: 2,
      dataSources: 4
    });

    setRecentJobs([
      { id: 1, name: 'Faculty Data Sync', status: 'success', time: '2 minutes ago' },
      { id: 2, name: 'Research Papers ETL', status: 'running', time: '5 minutes ago' },
      { id: 3, name: 'Department Migration', status: 'success', time: '1 hour ago' },
      { id: 4, name: 'Student Records Update', status: 'error', time: '2 hours ago' }
    ]);

    setJobTrends([
      { date: '2024-01', successful: 25, failed: 3 },
      { date: '2024-02', successful: 30, failed: 2 },
      { date: '2024-03', successful: 35, failed: 4 },
      { date: '2024-04', successful: 38, failed: 5 }
    ]);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'running':
        return <SyncOutlined spin style={{ color: '#1890ff' }} />;
      case 'error':
        return <ClockCircleOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const successRate = stats.totalJobs > 0 ? (stats.successfulJobs / stats.totalJobs) * 100 : 0;

  return (
    <div>
      <h1>Dashboard</h1>
      <Alert
        message="Welcome to ETL Tool"
        description="Monitor your data extraction, transformation, and loading processes all in one place."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Total Jobs"
              value={stats.totalJobs}
              prefix={<PlayCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Successful Jobs"
              value={stats.successfulJobs}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Running Jobs"
              value={stats.runningJobs}
              prefix={<SyncOutlined spin />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Data Sources"
              value={stats.dataSources}
              prefix={<DatabaseOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Job Success Trends" style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={jobTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="successful"
                  stroke="#52c41a"
                  strokeWidth={2}
                  name="Successful"
                />
                <Line
                  type="monotone"
                  dataKey="failed"
                  stroke="#ff4d4f"
                  strokeWidth={2}
                  name="Failed"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Success Rate" style={{ height: 200, marginBottom: 16 }}>
            <Progress
              type="circle"
              percent={Math.round(successRate)}
              format={(percent) => `${percent}%`}
              size={120}
            />
          </Card>
          <Card title="Recent Jobs" style={{ height: 184 }}>
            <Timeline size="small">
              {recentJobs.slice(0, 3).map(job => (
                <Timeline.Item
                  key={job.id}
                  dot={getStatusIcon(job.status)}
                >
                  <div>
                    <div style={{ fontWeight: 500 }}>{job.name}</div>
                    <div style={{ fontSize: '12px', color: '#999' }}>{job.time}</div>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card
            title="Quick Actions"
            extra={
              <Button type="primary" icon={<PlayCircleOutlined />}>
                Run New ETL Job
              </Button>
            }
          >
            <Row gutter={16}>
              <Col span={6}>
                <Button block icon={<DatabaseOutlined />}>
                  Add Data Source
                </Button>
              </Col>
              <Col span={6}>
                <Button block icon={<PlayCircleOutlined />}>
                  Create ETL Job
                </Button>
              </Col>
              <Col span={6}>
                <Button block icon={<CheckCircleOutlined />}>
                  View Results
                </Button>
              </Col>
              <Col span={6}>
                <Button block icon={<ClockCircleOutlined />}>
                  Job History
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
