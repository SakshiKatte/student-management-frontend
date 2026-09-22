import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import StudentForm from "./Studentform";
import TeacherLogin from "./TeacherLogin";
import TeacherDashboard from "./Teacherdashboard";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student" element={<StudentForm />} />

        <Route
          path="/teacher/login"
          element={<TeacherLogin />}
        />

        <Route
          path="/teacher/dashboard"
          element={<TeacherDashboard />}
        />

        <Route
          path="/"
          element={<Navigate to="/student" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;