# Timesheet Application

This Timesheet Application is designed to help organizations manage and track employee hours efficiently. Built with Django as the backend and React as the frontend, it offers a robust solution for time management.

## Features

- **User Authentication**: Secure login and registration system for employees and administrators.
- **Timesheet Management**: Employees can submit, edit, and view their timesheets.

## Technologies Used

- **Backend**: Django
- **Frontend**: React
- **Database**: SQLite

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

```bash
npm install npm@latest -g
pip install django
pip install djangorestframework
```

## Installing

1. Clone the repo

```bash
git clone https://github.com/yourusername/timesheet-application.git
```

2. Install NPM packages
```bash
npm install
```

3. Install Python packages
```bash
pip install -r requirements.txt
```

4. Change directory and run migrations
```bash
cd backend/
python manage.py migrate
```

5. Start the backend server
```bash
python manage.py runserver
```

6. Start the frontend server in a new terminal
```bash
cd frontend/
npm start
```

7. Click on the link from the frontend terminal
