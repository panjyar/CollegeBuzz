# NewsBuzz Project

NewsBuzz is a web application that aggregates news and information from various sources, featuring user authentication, archived content browsing, and a responsive frontend interface.

## Project Structure

The project consists of two main components:
- **Backend**: Flask API with MongoDB database
- **Frontend**: React application

## Prerequisites

Before running the project, ensure you have the following installed:
- Python 3.9+ 
- Node.js 16+
- MongoDB

## Backend Setup

### 1. Clone the repository
```bash
git clone https://github.com/panjyar/CollegeBuzz
cd newsbuzz
```

### 2. Set up Python virtual environment
```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

### 3. Install backend dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure environment variables
Create or modify the `.env` file in the backend directory with the following information:
```
MONGODB_URI=mongodb://localhost:27017/newsbuzz
JWT_SECRET_KEY=your_very_secure_secret_key
```

### 5. Initialize admin user (optional)
```bash
python setup_admin.py
```

### 6. Run the backend server
```bash
python app.py
```
The API server will start running at `http://localhost:5000`.

## Frontend Setup

### 1. Navigate to the frontend directory
```bash
# From the project root
cd frontend
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
The frontend development server will start running at `http://localhost:5173`.

## Application Features

- **User Authentication**: Register, Login, and Logout functionality
- **News Aggregation**: Content from multiple sources
- **Archived Content**: View and search historical content
- **Responsive Design**: Works on desktop and mobile devices

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user
- `GET /api/auth/user` - Get current user information (protected)

### Content
- `GET /api/content` - Get all content
- `GET /api/content/archived` - Get archived content (protected)
- `GET /api/content/:id` - Get specific content by ID

## Project Components

### Backend
- Flask web framework
- MongoDB database
- JWT authentication
- Web scraping functionality

### Frontend
- React for UI components
- React Router for navigation
- Context API for state management
- Responsive design with CSS

## Troubleshooting

### Backend Issues
- Ensure MongoDB is running
- Check the `.env` file configuration
- Verify network access to required external websites for scraping

### Frontend Issues
- Clear browser cache if facing UI issues
- Check console for JavaScript errors
- Ensure API endpoints are correctly configured

