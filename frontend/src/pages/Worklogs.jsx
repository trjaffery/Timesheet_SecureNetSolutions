import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../api"; 
const localizer = momentLocalizer(moment);
import "../styles/Calendar.scss";
import "../styles/WorkLogs.css";


const WorkLogs = () => {
    const [logData, setLogs] = useState({
        date: new Date(),
        start_time: "",
        end_time: "",
    });
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");

    useEffect(() => {
        getLogs();
    }, []);

    const getLogs = () => {
        api
            .get("/api/worklogs/")
            .then((res) => res.data)
            .then((data) => {
                setLogs(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteLog = (id) => {
        api
            .delete(`/api/worklogs/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Task deleted!");
                else alert("Failed to delete Task.");
                getTasks();
            })
            .catch((error) => alert(error));
    };

    const createLog = (e) => {
        e.preventDefault();
        api
            .post("/api/worklogs/", { date, start_time, end_time })
            .then((res) => {
                if (res.status === 201) alert("Task created!");
                else alert("Failed to make task.");
                getLogs();
            })
            .catch((err) => alert(err));
    };


    return (
        <div className="worklog-container">
            <div className="calendar-view">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    defaultView="week"
                    views={['week']}
                />
            </div>
            <div className="worklog-form">          
                <h2>{selectedEvent ? "Edit Work Log" : "Create Work Log"}</h2>       
                <form onSubmit={handleSubmit}>                    
                    <label htmlFor="date" className="form-label">Date:</label>
                    <br/>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        onChange={handleInputChange}
                        required
                        value={workLogData.date}
                        className="form-input"
                    />
                    <label htmlFor="start_time" className="form-label">Start Time:</label>          
                    <input
                        type="time"
                        id="start_time"
                        name="start_time"
                        required
                        onChange={handleInputChange}
                        value={workLogData.start_time}
                        className="form-input"
                    />
                    <label htmlFor="end_time" className="form-label">End Time:</label>          
                    <input
                        type="time"
                        id="end_time"
                        name="end_time"
                        required
                        onChange={handleInputChange}
                        value={workLogData.end_time}
                        className="form-input"
                    />
                    <input type="submit" value="Submit" className="form-button" />
                </form>
            </div>
        </div>
    );
};

export default WorkLog;