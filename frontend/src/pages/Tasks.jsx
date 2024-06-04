import { useState, useEffect } from "react";
import api from "../api";
import Task from "../components/Task"
import "../styles/Task.css"

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        api
            .get("/api/tasks/")
            .then((res) => res.data)
            .then((data) => {
                setTasks(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteTask = (id) => {
        api
            .delete(`/api/tasks/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Task deleted!");
                else alert("Failed to delete Task.");
                getTasks();
            })
            .catch((error) => alert(error));
    };

    const createTask = (e) => {
        e.preventDefault();
        api
            .post("/api/tasks/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Task created!");
                else alert("Failed to make task.");
                getTasks();
            })
            .catch((err) => alert(err));
    };

    return (
        <div className="tasks-container">
            <h1 className="tasks-title">Tasks</h1>
            <div className="tasks-list">
                {tasks.map((task) => (
                    <Task task={task} onDelete={deleteTask} key={task.id} />
                ))}
            </div>
            <div className="create-task-section">
                <h2 className="create-task-title">Create a Task</h2>
                <form className="task-form" onSubmit={createTask}>
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="form-input"
                    />
                    <label htmlFor="content" className="form-label">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-textarea"
                    ></textarea>
                    <input type="submit" value="Submit" className="form-button" />
                </form>
            </div>
        </div>
    );
}

export default Tasks;