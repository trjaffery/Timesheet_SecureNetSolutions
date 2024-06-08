import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../api"; 
import "../styles/Calendar.scss"; 
import "../styles/WorkLogs.css"; 
const localizer = momentLocalizer(moment);

const Leave = () => {
    return (
    <>
        <div className="calendar-view">
            <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable
                defaultView="month"
                views={['month']}
            />
        </div>
    </>
)};

export default Leave;