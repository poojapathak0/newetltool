import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  DatabaseOutlined,
  PlayCircleOutlined,
  HistoryOutlined,
  SettingOutlined,
  TableOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DataSources from './components/DataSources';
import ETLJobs from './components/ETLJobs';
import DataPreview from './components/DataPreview';
import JobHistory from './components/JobHistory';
import Settings from './components/Settings';

const { Header, Sider, Content } = Layout;

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/datasources',
      icon: <DatabaseOutlined />,
      label: 'Data Sources',
    },
    {
      key: '/jobs',
      icon: <PlayCircleOutlined />,
      label: 'ETL Jobs',
    },
    {
      key: '/preview',
      icon: <TableOutlined />,
      label: 'Data Preview',
    },
    {
      key: '/history',
      icon: <HistoryOutlined />,
      label: 'Job History',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="app-logo">
          ETL Tool - Data Management Made Easy
        </div>
      </Header>
      <Layout>
        <Sider width={200} theme="light">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ height: '100%', borderRight: 0 }}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content className="app-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/datasources" element={<DataSources />} />
              <Route path="/jobs" element={<ETLJobs />} />
              <Route path="/preview" element={<DataPreview />} />
              <Route path="/history" element={<JobHistory />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
