import { useState } from "react";
import { Link } from "react-router-dom";

function StudentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [phone, setPhone] = useState("");

  const submitStudent = async () => {
    if (!name || !email || !course || !phone) {
      alert("Please fill all fields!");
      return;
    }

    const student = {
      name,
      email,
      course,
      phone
    };

    try {
      const response = await fetch("http://localhost:8081/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
      });

      if (response.ok) {
        alert("Information submitted successfully!");

        setName("");
        setEmail("");
        setCourse("");
        setPhone("");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Backend connection error!");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h1>Student Information Form</h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={submitStudent}>
          Submit Information
        </button>

        <br />
        <br />

        <Link to="/teacher/login">
          <button type="button">Teacher Login</button>
        </Link>
      </div>
    </div>
  );
}

export default StudentForm;