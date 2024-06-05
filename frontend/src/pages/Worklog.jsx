import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../api"; 
const localizer = momentLocalizer(moment);
import "../styles/Calendar.scss";
import "../styles/WorkLog.css";


const WorkLog = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [workLogData, setWorkLogData] = useState({
        date: new Date(),
        hours_worked: "",
        description: "",
    });

    useEffect(() => {
        // Fetch existing work logs
        api.get("/api/worklogs/")
            .then((res) => {
                const data = res.data.map((log) => ({
                    title: `${log.hours_worked} hrs`,
                    start: new Date(log.date),
                    end: new Date(log.date),
                    allDay: true,
                    description: log.description,
                }));
                setEvents(data);
            })
            .catch((err) => alert(err));
    }, []);

    const handleSelectSlot = ({ start }) => {
        setWorkLogData({
            ...workLogData,
            date: start,
        });
        setSelectedEvent(null);
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setWorkLogData({
            date: event.start,
            hours_worked: event.title.split(" ")[0],
            description: event.description,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWorkLogData({ ...workLogData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { date, hours_worked, description } = workLogData;
        const formattedDate = moment(date).format("YYYY-MM-DD");
        console.log(formattedDate)
        api.post("/api/worklogs/", { date: formattedDate, hours_worked, description })
            .then((res) => {
                if (res.status === 201) {
                    alert("Work log created!");
                    setEvents([
                        ...events,
                        {
                            title: `${hours_worked} hrs`,
                            start: new Date(date),
                            end: new Date(date),
                            allDay: true,
                            description,
                        },
                    ]);
                } else {
                    alert("Failed to create work log.");
                }
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
                    <label htmlFor="date" className="form-label">Date: </label>
                    
                    
                    <label>{moment(workLogData.date).format("YYYY--MM--DD")}</label>
                    <br/>
                    {/* <input
                        type="text"
                        id="date"
                        name="date"
                        value={moment(workLogData.date).format("YYYY--MM--DD")}
                        className="form-input"
                        readOnly
                    /> */}
                    <label htmlFor="hours" className="form-label">Hours:</label>
                    
                    
                    
                    
                    <input
                        type="number"
                        id="hours_worked"
                        name="hours_worked"
                        required
                        onChange={handleInputChange}
                        value={workLogData.hours_worked}
                        className="form-input"
                    />
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        onChange={handleInputChange}
                        value={workLogData.description}
                        className="form-textarea"
                    ></textarea>
                    <input type="submit" value="Submit" className="form-button" />
                </form>
            </div>
        </div>
    );
};

export default WorkLog;