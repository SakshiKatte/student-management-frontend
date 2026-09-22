import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password!");
      return;
    }

    const teacher = {
      username: username,
      password: password
    };

    try {
      const response = await fetch(
        "http://localhost:8081/teachers/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(teacher)
        }
      );

      const message = await response.text();

      if (message === "Login successful") {
        alert("Login successful!");
                 localStorage.setItem("teacherLoggedIn", "true");
               navigate("/teacher/dashboard");
      } else {
        alert("Invalid username or password!");
      }
    } catch (error) {
      console.error(error);
      alert("Backend connection error!");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h1>Teacher Login</h1>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default TeacherLogin;