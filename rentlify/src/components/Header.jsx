import "../assets/css/components/header.css";

export default function Header() {
  return (
    <div className="header-container">
      <div className="herder-bg-left"></div>
      <div className="herder-bg-right"></div>
      <div className="container header-wrapper">
        <div className="header-brand">
          <div className="header-brand-left">
            <h2>RENT</h2>
            <h5>is our DEAL</h5>
          </div>
          <div className="header-brand-right"></div>
        </div>

        <form className="card card-body header-input-form">
          <div className="header-input-wraper">
            <div className="input-item">
              <span>Location</span>
              <input type="text" placeholder="Location" />
            </div>

            <div className="input-item">
              <span>Categories</span>
              <input type="text" placeholder="Categories" />
            </div>

            <div className="input-item">
              <span>Start Date</span>
              <input type="date" placeholder="Start Date" />
            </div>

            <div className="input-item">
              <span>End Date</span>
              <input type="date" placeholder="End Date" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
