import { Link } from "react-router-dom";
import "../assets/css/pages/login.css";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    console.log(user, "login");
  };
  return (
    <div className="login-container">
      <div className="container login-wrapper col-10 col-md-5">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="lg-input-item">
            <span>Username</span>
            <input
              required
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="lg-input"
            />
          </div>
          <div className="lg-input-item">
            <span>Password</span>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              className="lg-input"
            />
          </div>
          <div className="lg-infos-wrapper">
            <span>
              By logging in you are agreeing to our
              <Link to="#"> Terms of Services</Link> and
              <Link to="#"> Privacy Policy</Link>
            </span>
          </div>
          <button className="lg-btn" type="submit">
            Login
          </button>
          <div className="lg-actions-wrapper">
            <span>
              No Account? Please register <Link to="/register">here</Link>.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
