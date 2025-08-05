import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Select,
  Space,
  Tag,
  Pagination,
  Input,
  DatePicker,
  Row,
  Col
} from 'antd';
import {
  SearchOutlined,
  DownloadOutlined,
  ReloadOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

const DataPreview = () => {
  const [selectedTable, setSelectedTable] = useState('faculty');
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    dateRange: null
  });

  const availableTables = [
    { value: 'faculty', label: 'Faculty Data' },
    { value: 'research', label: 'Research Papers' },
    { value: 'departments', label: 'Departments' },
    { value: 'schools', label: 'Schools' }
  ];

  useEffect(() => {
    loadTableData();
  }, [selectedTable, pagination.current, pagination.pageSize, filters]);

  const loadTableData = async () => {
    setLoading(true);
    
    // Mock data based on selected table
    setTimeout(() => {
      switch (selectedTable) {
        case 'faculty':
          setColumns([
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
              width: 80,
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
              title: 'Department',
              dataIndex: 'department',
              key: 'department',
              render: (dept) => <Tag color="blue">{dept}</Tag>,
            },
            {
              title: 'Position',
              dataIndex: 'position',
              key: 'position',
            },
            {
              title: 'Hire Date',
              dataIndex: 'hireDate',
              key: 'hireDate',
            },
          ]);
          
          setTableData([
            {
              id: 1,
              name: 'Dr. John Smith',
              email: 'john.smith@university.edu',
              department: 'Computer Science',
              position: 'Professor',
              hireDate: '2015-08-15'
            },
            {
              id: 2,
              name: 'Dr. Emily Johnson',
              email: 'emily.johnson@university.edu',
              department: 'Mathematics',
              position: 'Associate Professor',
              hireDate: '2018-01-20'
            },
            {
              id: 3,
              name: 'Dr. Michael Brown',
              email: 'michael.brown@university.edu',
              department: 'Physics',
              position: 'Assistant Professor',
              hireDate: '2020-09-01'
            },
            {
              id: 4,
              name: 'Dr. Sarah Davis',
              email: 'sarah.davis@university.edu',
              department: 'Chemistry',
              position: 'Professor',
              hireDate: '2012-05-10'
            },
            {
              id: 5,
              name: 'Dr. Robert Wilson',
              email: 'robert.wilson@university.edu',
              department: 'Biology',
              position: 'Associate Professor',
              hireDate: '2017-03-15'
            }
          ]);
          
          setPagination({ ...pagination, total: 125 });
          break;

        case 'research':
          setColumns([
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
              width: 80,
            },
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
              render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
            },
            {
              title: 'Author',
              dataIndex: 'author',
              key: 'author',
            },
            {
              title: 'Journal',
              dataIndex: 'journal',
              key: 'journal',
              render: (journal) => <Tag color="green">{journal}</Tag>,
            },
            {
              title: 'Year',
              dataIndex: 'year',
              key: 'year',
            },
            {
              title: 'Citations',
              dataIndex: 'citations',
              key: 'citations',
            },
          ]);
          
          setTableData([
            {
              id: 1,
              title: 'Machine Learning Applications in Education',
              author: 'Dr. John Smith',
              journal: 'Journal of Educational Technology',
              year: 2023,
              citations: 45
            },
            {
              id: 2,
              title: 'Quantum Computing Algorithms',
              author: 'Dr. Emily Johnson',
              journal: 'Nature Physics',
              year: 2023,
              citations: 128
            },
            {
              id: 3,
              title: 'Climate Change Impact on Biodiversity',
              author: 'Dr. Robert Wilson',
              journal: 'Environmental Science',
              year: 2022,
              citations: 89
            }
          ]);
          
          setPagination({ ...pagination, total: 87 });
          break;

        case 'departments':
          setColumns([
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
              width: 80,
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
            },
            {
              title: 'School',
              dataIndex: 'school',
              key: 'school',
              render: (school) => <Tag color="purple">{school}</Tag>,
            },
            {
              title: 'Head',
              dataIndex: 'head',
              key: 'head',
            },
            {
              title: 'Faculty Count',
              dataIndex: 'facultyCount',
              key: 'facultyCount',
            },
            {
              title: 'Established',
              dataIndex: 'established',
              key: 'established',
            },
          ]);
          
          setTableData([
            {
              id: 1,
              name: 'Computer Science',
              school: 'Engineering',
              head: 'Dr. Alice Cooper',
              facultyCount: 25,
              established: '1995'
            },
            {
              id: 2,
              name: 'Mathematics',
              school: 'Sciences',
              head: 'Dr. Bob Miller',
              facultyCount: 18,
              established: '1970'
            },
            {
              id: 3,
              name: 'Physics',
              school: 'Sciences',
              head: 'Dr. Carol White',
              facultyCount: 22,
              established: '1965'
            }
          ]);
          
          setPagination({ ...pagination, total: 15 });
          break;

        default:
          setColumns([]);
          setTableData([]);
          setPagination({ ...pagination, total: 0 });
      }
      
      setLoading(false);
    }, 500);
  };

  const handleTableChange = (value) => {
    setSelectedTable(value);
    setPagination({ ...pagination, current: 1 });
  };

  const handleSearch = (value) => {
    setFilters({ ...filters, search: value });
    setPagination({ ...pagination, current: 1 });
  };

  const handleDateRangeChange = (dates) => {
    setFilters({ ...filters, dateRange: dates });
    setPagination({ ...pagination, current: 1 });
  };

  const handleExport = () => {
    // Mock export functionality
    const csvContent = [
      columns.map(col => col.title).join(','),
      ...tableData.map(row => 
        columns.map(col => row[col.dataIndex] || '').join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedTable}_data.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePaginationChange = (page, pageSize) => {
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize
    });
  };

  return (
    <div>
      <h1>Data Preview</h1>
      
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Select
              value={selectedTable}
              onChange={handleTableChange}
              style={{ width: '100%' }}
              placeholder="Select table"
            >
              {availableTables.map(table => (
                <Option key={table.value} value={table.value}>
                  {table.label}
                </Option>
              ))}
            </Select>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Input.Search
              placeholder="Search data..."
              allowClear
              onSearch={handleSearch}
              style={{ width: '100%' }}
            />
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <RangePicker
              onChange={handleDateRangeChange}
              style={{ width: '100%' }}
              placeholder={['Start Date', 'End Date']}
            />
          </Col>
          
          <Col xs={24} sm={12} md={4}>
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={loadTableData}
                loading={loading}
              >
                Refresh
              </Button>
              <Button
                icon={<DownloadOutlined />}
                onClick={handleExport}
                disabled={tableData.length === 0}
              >
                Export
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Tag color="blue">
              <EyeOutlined /> Showing {tableData.length} of {pagination.total} records
            </Tag>
            <Tag>
              Table: {availableTables.find(t => t.value === selectedTable)?.label}
            </Tag>
          </Space>
        </div>
        
        <Table
          columns={columns}
          dataSource={tableData}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: handlePaginationChange,
            onShowSizeChange: handlePaginationChange,
          }}
          scroll={{ x: 'max-content' }}
          className="data-preview-table"
        />
      </Card>
    </div>
  );
};

export default DataPreview;
