import "../assets/css/components/navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="container navbar-wrapper">
        <div className="navbar-left">
          <div className="logo">
            <Link to="/">
              <span>Rentlify</span>
            </Link>
          </div>
        </div>

        <div className="navbar-right">
          <div className="navbar-actions">
            <Link to="/register">
              <button>Sign Up</button>
            </Link>
            <Link to="/login">
              <button>Sign In</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
