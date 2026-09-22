import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const getStudents = async () => {
    try {
      const response = await fetch("http://localhost:8081/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load student data!");
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("teacherLoggedIn");

    if (isLoggedIn !== "true") {
      navigate("/teacher/login");
      return;
    }

    getStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("teacherLoggedIn");
    navigate("/teacher/login");
  };

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-card">

        <h2>Student Management</h2>

        <div className="total-students">
          <strong>Total Students: {students.length}</strong>
        </div>

        <br />

        <input
          className="search-box"
          type="text"
          placeholder="Search student by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    <td>{student.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default TeacherDashboard;