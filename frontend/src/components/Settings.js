import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Select,
  Divider,
  message,
  Row,
  Col,
  Alert,
  InputNumber,
  Space,
  Typography
} from 'antd';
import {
  SaveOutlined,
  ReloadOutlined,
  MailOutlined,
  BellOutlined,
  DatabaseOutlined,
  SecurityScanOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Title, Text } = Typography;

const Settings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    // Mock settings data
    const mockSettings = {
      // General Settings
      appName: 'ETL Tool',
      defaultTimezone: 'UTC',
      dateFormat: 'YYYY-MM-DD',
      maxConcurrentJobs: 5,
      jobTimeout: 3600,
      
      // Notification Settings
      enableEmailNotifications: true,
      enableDesktopNotifications: false,
      notifyOnJobSuccess: true,
      notifyOnJobFailure: true,
      notifyOnJobStart: false,
      emailRecipients: 'admin@company.com',
      
      // Database Settings
      connectionTimeout: 30,
      queryTimeout: 300,
      maxRetries: 3,
      retryDelay: 5,
      
      // Security Settings
      enableAuditLog: true,
      sessionTimeout: 8,
      requireStrongPasswords: true,
      enableTwoFactorAuth: false,
      
      // Performance Settings
      batchSize: 1000,
      memoryLimit: 2048,
      enableCaching: true,
      cacheExpiry: 24
    };
    
    setSettings(mockSettings);
    form.setFieldsValue(mockSettings);
  };

  const handleSave = async (values) => {
    setLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSettings(values);
      message.success('Settings saved successfully');
    } catch (error) {
      message.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.setFieldsValue(settings);
    message.info('Settings reset to last saved values');
  };

  const handleTestEmail = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Test email sent successfully');
    } catch (error) {
      message.error('Failed to send test email');
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={settings}
      >
        {/* General Settings */}
        <Card title="General Settings" style={{ marginBottom: 24 }}>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="appName"
                label="Application Name"
                rules={[{ required: true, message: 'Please enter application name' }]}
              >
                <Input placeholder="ETL Tool" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="defaultTimezone"
                label="Default Timezone"
                rules={[{ required: true, message: 'Please select timezone' }]}
              >
                <Select placeholder="Select timezone">
                  <Option value="UTC">UTC</Option>
                  <Option value="America/New_York">Eastern Time</Option>
                  <Option value="America/Chicago">Central Time</Option>
                  <Option value="America/Denver">Mountain Time</Option>
                  <Option value="America/Los_Angeles">Pacific Time</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="dateFormat"
                label="Date Format"
                rules={[{ required: true, message: 'Please select date format' }]}
              >
                <Select placeholder="Select date format">
                  <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                  <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                  <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                  <Option value="YYYY/MM/DD">YYYY/MM/DD</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="maxConcurrentJobs"
                label="Max Concurrent Jobs"
                rules={[{ required: true, message: 'Please enter max concurrent jobs' }]}
              >
                <InputNumber
                  min={1}
                  max={20}
                  style={{ width: '100%' }}
                  placeholder="5"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Notification Settings */}
        <Card title="Notification Settings" style={{ marginBottom: 24 }}>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="enableEmailNotifications"
                label="Enable Email Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="enableDesktopNotifications"
                label="Enable Desktop Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="notifyOnJobSuccess"
                label="Notify on Job Success"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="notifyOnJobFailure"
                label="Notify on Job Failure"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="notifyOnJobStart"
                label="Notify on Job Start"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="emailRecipients"
                label="Email Recipients"
                rules={[{ type: 'email', message: 'Please enter valid email addresses' }]}
              >
                <Input
                  placeholder="admin@company.com, user@company.com"
                  suffix={
                    <Button
                      type="link"
                      size="small"
                      icon={<MailOutlined />}
                      onClick={handleTestEmail}
                    >
                      Test
                    </Button>
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Database Settings */}
        <Card title="Database Settings" style={{ marginBottom: 24 }}>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="connectionTimeout"
                label="Connection Timeout (seconds)"
                rules={[{ required: true, message: 'Please enter connection timeout' }]}
              >
                <InputNumber
                  min={10}
                  max={300}
                  style={{ width: '100%' }}
                  placeholder="30"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="queryTimeout"
                label="Query Timeout (seconds)"
                rules={[{ required: true, message: 'Please enter query timeout' }]}
              >
                <InputNumber
                  min={30}
                  max={3600}
                  style={{ width: '100%' }}
                  placeholder="300"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="maxRetries"
                label="Max Retries"
                rules={[{ required: true, message: 'Please enter max retries' }]}
              >
                <InputNumber
                  min={0}
                  max={10}
                  style={{ width: '100%' }}
                  placeholder="3"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="retryDelay"
                label="Retry Delay (seconds)"
                rules={[{ required: true, message: 'Please enter retry delay' }]}
              >
                <InputNumber
                  min={1}
                  max={60}
                  style={{ width: '100%' }}
                  placeholder="5"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Security Settings */}
        <Card title="Security Settings" style={{ marginBottom: 24 }}>
          <Alert
            message="Security Notice"
            description="Changes to security settings will affect all users and may require re-authentication."
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="enableAuditLog"
                label="Enable Audit Logging"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="requireStrongPasswords"
                label="Require Strong Passwords"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="sessionTimeout"
                label="Session Timeout (hours)"
                rules={[{ required: true, message: 'Please enter session timeout' }]}
              >
                <InputNumber
                  min={1}
                  max={24}
                  style={{ width: '100%' }}
                  placeholder="8"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="enableTwoFactorAuth"
                label="Enable Two-Factor Authentication"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Performance Settings */}
        <Card title="Performance Settings" style={{ marginBottom: 24 }}>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="batchSize"
                label="Batch Size"
                rules={[{ required: true, message: 'Please enter batch size' }]}
              >
                <InputNumber
                  min={100}
                  max={10000}
                  style={{ width: '100%' }}
                  placeholder="1000"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="memoryLimit"
                label="Memory Limit (MB)"
                rules={[{ required: true, message: 'Please enter memory limit' }]}
              >
                <InputNumber
                  min={512}
                  max={8192}
                  style={{ width: '100%' }}
                  placeholder="2048"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="enableCaching"
                label="Enable Caching"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="cacheExpiry"
                label="Cache Expiry (hours)"
                rules={[{ required: true, message: 'Please enter cache expiry' }]}
              >
                <InputNumber
                  min={1}
                  max={168}
                  style={{ width: '100%' }}
                  placeholder="24"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Action Buttons */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text type="secondary">
              Changes will be applied immediately after saving.
            </Text>
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                htmlType="submit"
                loading={loading}
              >
                Save Settings
              </Button>
            </Space>
          </div>
        </Card>
      </Form>
    </div>
  );
};

export default Settings;
