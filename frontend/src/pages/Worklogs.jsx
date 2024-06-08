import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../api"; 
import "../styles/Calendar.scss"; 
import "../styles/WorkLogs.css"; 

const localizer = momentLocalizer(moment);

const WorkLogs = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [workLogData, setWorkLogData] = useState({
        date: new Date(),
        start_time: "",
        end_time: "",
    });

    useEffect(() => {
        getLogs();
    }, []);


    const getLogs = () => {
        api
            .get("/api/worklogs/")
            .then((res) => res.data)
            .then((data) => {
                const logs = data.map((log) => ({
                    title: `Log: ${log.start_time} - ${log.end_time}`,
                    start: new Date(log.date + "T" + log.start_time),
                    end: new Date(log.date + "T" + log.end_time),
                    allDay: false,
                    ...log,
                }));
                setEvents(logs);
            })
            .catch((err) => alert(err));
    };

    const handleSelectSlot = ({ start }) => {
        setWorkLogData({
            ...workLogData,
            date: moment(start).format("YYYY-MM-DD"),
            start_time: moment(start).format("HH:00"),
        });
        setSelectedEvent(null);
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        
        setWorkLogData({
            date: moment(event.start).format("YYYY-MM-DD"),
            start_time: moment(event.start).format("HH:mm"),
            end_time: moment(event.end).format("HH:mm"),
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWorkLogData({ ...workLogData, [name]: value });
    };

    const deleteLog = (id) => {
        api
            .delete(`/api/worklogs/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Log deleted!");
                else alert("Failed to delete Log.");
                getLogs();
            })
            .catch((error) => alert(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      
        const { date, start_time, end_time } = workLogData;
        const formattedData = { date, start_time, end_time };
        console.log("Submitting work log:", formattedData);
      
        if (selectedEvent) {
          // Edit existing event
          api.put(`/api/worklogs/update/${selectedEvent.id}/`, formattedData) 
            .then((res) => {
              if (res.status === 200) {
                alert("Work log updated!");
      
                
                const updatedEvents = events.map((event) =>
                  event.id === selectedEvent.id ? { ...event, ...formattedData } : event
                );
                setEvents(updatedEvents);
                getLogs(); 
              } else {
                alert("Failed to update work log.");
              }
            })
            .catch((err) => alert(err));
        } else {
          
          api.post("/api/worklogs/", formattedData)
            .then((res) => {
              if (res.status === 201) {
                alert("Work log created!");
                const newEvent = {
                  title: "Log:",
                  start: moment(new Date(date + "T" + start_time)).format("HH:mm"),
                  end: moment(new Date(date + "T" + end_time)).format("HH:mm"),
                  allDay: false,
                };
                setEvents([...events, newEvent]); 
                getLogs();
              } else {
                alert("Failed to create work log.");
              }
            })
            .catch((err) => alert(err));
        }
      };

    return (
        <>
            <div className="button-container">
                <button onClick={() => window.location.href = "/"} className="button">Home</button>
                <button onClick={() => window.location.href = "/logout"} className="button">Log out</button>
            </div>
            <div className="worklog-container">
                <div className="calendar-view">
                    <Calendar
                        localizer={localizer}
                        min={new Date().setHours(6, 0, 0, 0)} 
                        max={new Date().setHours(23, 59, 59, 999)}
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
                        {selectedEvent && (
                        <button
                            type="button"
                            className="form-button"
                            onClick={() => deleteLog(selectedEvent.id)}
                        >
                            Delete Log
                        </button>
                        )}
                        <input type="submit" value={selectedEvent ? "Edit Log" : "Submit"} className="form-button" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default WorkLogs;