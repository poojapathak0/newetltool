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
  Popconfirm,
  Tooltip
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;

const DataSources = () => {
  const [dataSources, setDataSources] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSource, setEditingSource] = useState(null);
  const [form] = Form.useForm();
  const [testingConnection, setTestingConnection] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setDataSources([
      {
        id: 1,
        name: 'MySQL Faculty DB',
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        database: 'university',
        status: 'connected',
        lastConnected: '2024-01-15 10:30:00'
      },
      {
        id: 2,
        name: 'MongoDB Research',
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'research_papers',
        status: 'connected',
        lastConnected: '2024-01-15 09:45:00'
      },
      {
        id: 3,
        name: 'PostgreSQL Analytics',
        type: 'postgresql',
        host: 'analytics.example.com',
        port: 5432,
        database: 'analytics',
        status: 'error',
        lastConnected: '2024-01-14 16:20:00'
      }
    ]);
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <DatabaseOutlined style={{ color: '#1890ff' }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={getTypeColor(type)}>{type.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Connection',
      dataIndex: 'host',
      key: 'connection',
      render: (host, record) => `${host}:${record.port}`,
    },
    {
      title: 'Database',
      dataIndex: 'database',
      key: 'database',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
          color={status === 'connected' ? 'green' : 'red'}
          icon={status === 'connected' ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Last Connected',
      dataIndex: 'lastConnected',
      key: 'lastConnected',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Test Connection">
            <Button
              icon={<CheckCircleOutlined />}
              size="small"
              onClick={() => handleTestConnection(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this data source?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} size="small" danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const getTypeColor = (type) => {
    const colors = {
      'mysql': 'blue',
      'postgresql': 'purple',
      'mongodb': 'green',
      'oracle': 'orange',
      'sqlserver': 'red'
    };
    return colors[type] || 'default';
  };

  const handleAdd = () => {
    setEditingSource(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (source) => {
    setEditingSource(source);
    form.setFieldsValue(source);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setDataSources(dataSources.filter(ds => ds.id !== id));
    message.success('Data source deleted successfully');
  };

  const handleTestConnection = async (source) => {
    setTestingConnection(true);
    // Simulate API call
    setTimeout(() => {
      setTestingConnection(false);
      message.success('Connection test successful!');
    }, 2000);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingSource) {
        // Update existing source
        setDataSources(dataSources.map(ds => 
          ds.id === editingSource.id 
            ? { ...ds, ...values, lastConnected: new Date().toISOString().slice(0, 19).replace('T', ' ') }
            : ds
        ));
        message.success('Data source updated successfully');
      } else {
        // Add new source
        const newSource = {
          id: Date.now(),
          ...values,
          status: 'connected',
          lastConnected: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        setDataSources([...dataSources, newSource]);
        message.success('Data source added successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to save data source');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1>Data Sources</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Data Source
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={dataSources}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingSource ? 'Edit Data Source' : 'Add Data Source'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input placeholder="e.g., MySQL Faculty Database" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Database Type"
            rules={[{ required: true, message: 'Please select a database type' }]}
          >
            <Select placeholder="Select database type">
              <Option value="mysql">MySQL</Option>
              <Option value="postgresql">PostgreSQL</Option>
              <Option value="mongodb">MongoDB</Option>
              <Option value="oracle">Oracle</Option>
              <Option value="sqlserver">SQL Server</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="host"
            label="Host"
            rules={[{ required: true, message: 'Please enter host' }]}
          >
            <Input placeholder="localhost or IP address" />
          </Form.Item>

          <Form.Item
            name="port"
            label="Port"
            rules={[{ required: true, message: 'Please enter port' }]}
          >
            <Input type="number" placeholder="3306" />
          </Form.Item>

          <Form.Item
            name="database"
            label="Database Name"
            rules={[{ required: true, message: 'Please enter database name' }]}
          >
            <Input placeholder="database_name" />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter username' }]}
          >
            <Input placeholder="database_user" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              loading={testingConnection}
              onClick={() => {
                const values = form.getFieldsValue();
                handleTestConnection(values);
              }}
            >
              Test Connection
            </Button>
            <Space>
              <Button onClick={() => {
                setIsModalVisible(false);
                form.resetFields();
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingSource ? 'Update' : 'Add'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default DataSources;
