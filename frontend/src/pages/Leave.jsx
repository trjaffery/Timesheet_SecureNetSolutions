import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../api";
import "../styles/Calendar.scss";
import "../styles/Leave.css";

const localizer = momentLocalizer(moment);

const Leave = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [leaveData, setLeaveData] = useState({
        leave_type: "",
        start_date: "", 
        end_date: "",
        description: "",
        allDay: true,
    });

    useEffect(() => {
        getLeave();
    }, []);

    const getLeave = () => {
        api
            .get("/api/leaves/")
            .then((res) => res.data)
            .then((data) => {
                const leave = data.map((leave) => ({
                    title: "Leave",
                    start: new Date(leave.start_date),
                    end: new Date(leave.end_date),
                    allDay: true,
                    ...leave,
                }));
                setEvents(leave);
            })
            .catch((err) => alert(err));
    };

    const handleSelectSlot = ({ start }) => {
        setLeaveData({
            ...leaveData,
            start_date: moment(start).format("YYYY-MM-DD"),
            end_date: moment(start).format("YYYY-MM-DD"),
        });
        setSelectedEvent(null);
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);

        setLeaveData({
            leave_type: event.leave_type,
            start_date: moment(event.start).format("YYYY-MM-DD"),
            end_date: moment(event.end).format("YYYY-MM-DD"),
            description: event.description,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLeaveData({ ...leaveData, [name]: value });
    };

    const deleteLeave = (id) => {
        api
            .delete(`/api/leaves/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Leave deleted!");
                else alert("Failed to delete leave.");
                getLeave();
            })
            .catch((error) => alert(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { leave_type, start_date, end_date, description } = leaveData;
        const formattedData = { leave_type, start_date, end_date, description };
        console.log("Submitting work log:", formattedData);

        api.post("/api/leaves/", formattedData)
            .then((res) => {
                if (res.status === 201) {
                    alert("Leave created!");
                    const newEvent = {
                        title: 'Leave',
                        start: new Date(formattedData.start_date),
                        end: new Date(formattedData.end_date),
                        allDay: true,
                    };
                    setEvents([...events, newEvent]);
                    getLeave();
                } else {
                    alert("Failed to create leave.");
                }
            })
            .catch((err) => alert(err));
    };

    return (
        <>
            <div className="leave-container">
                <div className="calendar-view">
                    <Calendar
                        localizer={localizer}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 600, width: 700 }}
                        selectable
                        events={events}
                        onSelectSlot={handleSelectSlot}
                        onSelectEvent={handleSelectEvent}
                        defaultView="month"
                        views={['month']}
                        defaultDate={new Date()}
                    />
                </div>
                <div className="leave-form">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="leave_type" className="form-label">Leave Type:</label>
                        <input
                            type="text"
                            id="leave_type"
                            name="leave_type"
                            onChange={handleInputChange}
                            required
                            value={leaveData.leave_type}
                            className="form-input"
                        />
                        <label htmlFor="start_date" className="form-label">Start Date:</label>
                        <input
                            type="date"
                            id="start_date"
                            name="start_date"
                            required
                            onChange={handleInputChange}
                            value={leaveData.start_date}
                            className="form-input"
                        />
                        <label htmlFor="end_date" className="form-label">End Date:</label>
                        <input
                            type="date"
                            id="end_date"
                            name="end_date"
                            required
                            onChange={handleInputChange}
                            value={leaveData.end_date}
                            className="form-input"
                        />
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={handleInputChange}
                            value={leaveData.description}
                            className="form-input"
                        />
                        {selectedEvent && (
                            <button
                                type="button"
                                className="form-button"
                                onClick={() => deleteLeave(selectedEvent.id)}
                            >
                                Delete
                            </button>
                        )}
                        <input type="submit" value={"Submit"} className="form-button" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Leave;