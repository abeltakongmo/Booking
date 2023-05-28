import "../assets/css/components/navbar.css";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="container navbar-wrapper">
        <div className="navbar-left">
          <div className="logo">
            <span>Rentlify</span>
          </div>
        </div>

        <div className="navbar-right">
          <div className="navbar-actions">
            <button>Sign Up</button>
            <button>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}
