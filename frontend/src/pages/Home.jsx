import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Make sure the path to your CSS file is correct

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>SecureNet Solutions Timesheet</h1>
            <div className="button-container">
                <button className="nav-button" onClick={() => navigate('/worklogs')}>
                    Work Logs
                </button>
                <button className="nav-button" onClick={() => navigate('/leave')}>
                    Employee Leave
                </button>
                <button className="nav-button" onClick={() => navigate('/tasks')}>
                    Tasks
                </button>
            </div>
        </div>
    );
};

export default Home;