import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Leave from "./pages/Leave";
import Notfound from "./pages/Notfound";
import Worklogs from "./pages/Worklogs";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        
        <Route
        path="/worklogs"
        element={
          <ProtectedRoute>
            <Worklogs />
          </ProtectedRoute>
        }
        />
        <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
        />
        <Route
        path="/leave"
        element={
          <ProtectedRoute>
            <Leave />
          </ProtectedRoute>
        }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App