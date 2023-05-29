import { Link } from "react-router-dom";
import "../assets/css/pages/register.css";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      username,
      password,
    };

    console.log(user, "register");
  };
  return (
    <div className="register-container">
      <div className="container register-wrapper">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="rg-input-item">
            <span>Username</span>
            <input
              required
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="rg-input"
            />
          </div>
          <div className="rg-input-item">
            <span>Email</span>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Username"
              className="rg-input"
            />
          </div>
          <div className="rg-input-item">
            <span>Password</span>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              className="rg-input"
            />
          </div>
          <div className="rg-infos-wrapper">
            <span>
              By logging in you are agreeing to our{" "}
              <Link to="#"> Terms of Services </Link> and
              <Link to="#"> Privacy Policy</Link>
            </span>
          </div>
          <button className="rg-btn" type="submit">
            Register
          </button>
          <div className="rg-actions-wrapper">
            <span>
              Already an Account? Please Login <Link to="/login">here</Link>.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
