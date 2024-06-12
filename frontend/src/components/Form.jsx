import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function Form({route, method}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const data = { username, password };
        if (method === "register") {
            data.first_name = firstName;
            data.last_name = lastName;
        }
        console.log("Rendering form with method:", method);

        try {
            const res = await api.post(route, data)
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            } else {
                navigate("/login")
            }

        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

return (   
   <form onSubmit={handleSubmit}>
            <h1>{method === "login" ? "Login" : "Register"}</h1>
            {method === "register" && (
                <>
                    <input
                        className="form-input"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />
                    <input
                        className="form-input"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                    />
                </>
            )}
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Employee ID"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Loading..." : method === "login" ? "Login" : "Register"}
            </button>
            {method==="login" && (
                <button className="register-button" onClick={() => window.location.href = "/register"}>Register</button>
            )

            }
        </form>
    );
}


export default Form;