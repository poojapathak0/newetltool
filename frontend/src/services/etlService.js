import api from './api';

export const etlService = {
  // ETL Jobs
  getJobs: () => api.get('/api/etl/jobs'),
  createJob: (jobData) => api.post('/api/etl/jobs', jobData),
  updateJob: (jobId, jobData) => api.put(`/api/etl/jobs/${jobId}`, jobData),
  deleteJob: (jobId) => api.delete(`/api/etl/jobs/${jobId}`),
  runJob: (jobId) => api.post(`/api/etl/jobs/${jobId}/run`),
  stopJob: (jobId) => api.post(`/api/etl/jobs/${jobId}/stop`),
  getJobStatus: (jobId) => api.get(`/api/etl/jobs/${jobId}/status`),
  
  // Job History
  getJobHistory: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/api/etl/history?${params}`);
  },
  getJobLogs: (jobId) => api.get(`/api/etl/history/${jobId}/logs`),
  
  // Data Sources
  getDataSources: () => api.get('/api/datasources'),
  createDataSource: (sourceData) => api.post('/api/datasources', sourceData),
  updateDataSource: (sourceId, sourceData) => api.put(`/api/datasources/${sourceId}`, sourceData),
  deleteDataSource: (sourceId) => api.delete(`/api/datasources/${sourceId}`),
  testConnection: (sourceData) => api.post('/api/datasources/test', sourceData),
  
  // Data Preview
  getTablesList: (sourceId) => api.get(`/api/datasources/${sourceId}/tables`),
  getTableData: (sourceId, tableName, options = {}) => {
    const params = new URLSearchParams(options);
    return api.get(`/api/datasources/${sourceId}/tables/${tableName}/data?${params}`);
  },
  
  // Dashboard Stats
  getDashboardStats: () => api.get('/api/dashboard/stats'),
  getJobTrends: () => api.get('/api/dashboard/trends'),
  
  // Settings
  getSettings: () => api.get('/api/settings'),
  updateSettings: (settings) => api.put('/api/settings', settings),
  testEmailSettings: () => api.post('/api/settings/test-email'),
  
  // Transformations
  getTransformations: () => api.get('/api/transformations'),
  createTransformation: (transformData) => api.post('/api/transformations', transformData),
  updateTransformation: (transformId, transformData) => api.put(`/api/transformations/${transformId}`, transformData),
  deleteTransformation: (transformId) => api.delete(`/api/transformations/${transformId}`),
  validateTransformation: (transformData) => api.post('/api/transformations/validate', transformData),
};
