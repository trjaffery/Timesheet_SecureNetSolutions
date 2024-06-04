import React from "react";
import "../styles/Task.css"

function Task({ task, onDelete }) {
    const formattedDate = new Date(task.created_at).toLocaleDateString("en-US")

    return (
        <div className="task-container">
            <p className="task-title">{task.title}</p>
            <p className="task-content">{task.content}</p>
            <p className="task-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(task.id)}>
                Delete
            </button>
        </div>
    );
}

export default Task