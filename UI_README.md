# ETL Tool - User Interface

A modern, user-friendly web interface for the ETL Tool that makes data extraction, transformation, and loading accessible to non-technical users.

## Features

### 🎯 **Dashboard**
- Real-time overview of ETL processes
- Job success trends and statistics
- System health monitoring
- Quick action buttons

### 🔌 **Data Sources Management**
- Easy setup of database connections (MySQL, PostgreSQL, MongoDB, etc.)
- Connection testing and validation
- Secure credential storage
- Visual connection status indicators

### ⚙️ **ETL Jobs**
- Intuitive job creation wizard
- Step-by-step configuration
- One-click job execution
- Real-time progress monitoring
- Job scheduling options

### 📊 **Data Preview**
- Browse and preview data from any connected source
- Advanced filtering and search capabilities
- Export data to CSV
- Pagination for large datasets

### 📈 **Job History**
- Comprehensive execution history
- Detailed logs and error tracking
- Performance metrics
- Success rate analytics

### 🛠️ **Settings**
- System configuration
- Notification preferences
- Security settings
- Performance tuning

## Technology Stack

- **Frontend**: React 18 with Ant Design
- **Backend**: FastAPI (Python)
- **Charts**: Recharts
- **State Management**: React Hooks
- **HTTP Client**: Axios

## Quick Start

### Prerequisites
- Node.js 14+ and npm
- Python 3.8+
- pip

### Setup Instructions

1. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   pip install fastapi uvicorn python-multipart
   ```

3. **Start the Backend Server**
   ```bash
   cd backend
   python server.py
   ```
   The API will be available at `http://localhost:8000`

4. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The web interface will be available at `http://localhost:3000`

## Usage Guide

### For Non-Technical Users

#### 1. **Setting Up Data Sources**
- Navigate to "Data Sources" in the sidebar
- Click "Add Data Source"
- Fill in your database connection details
- Test the connection before saving

#### 2. **Creating ETL Jobs**
- Go to "ETL Jobs"
- Click "Create New Job"
- Follow the 3-step wizard:
  - **Basic Info**: Name and description
  - **Data Flow**: Select source and destination
  - **Configuration**: Set schedule and transformations

#### 3. **Running Jobs**
- Find your job in the ETL Jobs list
- Click the "Run" button
- Monitor progress in real-time
- View results in the Data Preview section

#### 4. **Monitoring Results**
- Check the Dashboard for overall status
- Use Job History to track past executions
- Download logs for troubleshooting

### Key Benefits for Non-Technical Users

✅ **No Coding Required** - Everything is done through an intuitive web interface  
✅ **Visual Feedback** - Real-time progress bars and status indicators  
✅ **Error Prevention** - Built-in validation and testing  
✅ **Self-Service** - Create and manage ETL processes independently  
✅ **Comprehensive Monitoring** - Track everything from one dashboard  

## API Documentation

When the backend is running, visit `http://localhost:8000/docs` for the interactive API documentation.

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/         # React components
│   │   ├── Dashboard.js    # Main dashboard
│   │   ├── DataSources.js  # Data source management
│   │   ├── ETLJobs.js      # Job management
│   │   ├── DataPreview.js  # Data browsing
│   │   ├── JobHistory.js   # Execution history
│   │   └── Settings.js     # Configuration
│   ├── services/          # API services
│   └── App.js             # Main application
└── package.json

backend/
├── app/
│   ├── api/               # API endpoints
│   │   ├── etl.py         # ETL job management
│   │   ├── datasources.py # Data source management
│   │   └── dashboard.py   # Dashboard data
│   └── main.py            # FastAPI application
└── server.py              # Server startup
```

## Configuration

### Environment Variables

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8000
```

### Backend Configuration

The backend uses FastAPI with CORS enabled for development. For production:
- Configure proper CORS origins
- Set up authentication
- Use environment variables for sensitive data
- Configure database connections

## Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Frontend default: 3000
   - Backend default: 8000
   - Change ports in package.json or server.py if needed

2. **CORS Issues**
   - Ensure backend CORS is configured correctly
   - Check that API_URL matches backend address

3. **Missing Dependencies**
   - Run `npm install` in frontend directory
   - Run `pip install -r requirements.txt` in backend directory

### Getting Help

- Check the browser console for frontend errors
- Check terminal output for backend errors
- Visit `/docs` endpoint for API documentation
- Review component props and state in React DevTools

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
