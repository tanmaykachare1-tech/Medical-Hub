import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // ✅ validation
    if (!email || !password) {
      alert("Please enter email and password ❗");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (foundUser) {
      // ✅ SAVE CURRENT USER (IMPORTANT FIX)
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(foundUser)
      );

      alert("Login Successful ✅");

      // clear fields (optional but good)
      setEmail("");
      setPassword("");

      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Health Hub</h1>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <p className="signup-text">
          New user?{" "}
          <span onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;