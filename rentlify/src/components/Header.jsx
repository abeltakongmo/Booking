import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "../assets/css/components/header.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";

const places = ["places"];

export default function Header() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const autoCompleteRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_API_KEY,
    libraries: places,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const item = {
      location,
      category,
      dates,
    };
    console.log(item, "submitted.");
  };

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

        <form
          className="card card-body header-input-form col-12"
          onSubmit={handleSubmit}
        >
          <div className="header-input-wraper d-flex flex-column flex-md-row">
            <div className="input-item col-12 col-md-2">
              <span>Location</span>
              {!isLoaded ? (
                <input
                  required
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="Location"
                />
              ) : (
                <Autocomplete ref={autoCompleteRef} className="auto-cpl">
                  <input
                    required
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    placeholder="Location"
                  />
                </Autocomplete>
              )}
            </div>

            <div className="input-item col-12 col-md-2">
              <span>Categories</span>
              <input
                required
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="Categories"
              />
            </div>

            <div className="input-item col-12 col-md-4">
              <div
                className="date-range"
                onClick={() => setOpenDate(!openDate)}
              >
                <div className="date-rg-item">
                  <span>Start Date</span>
                  <div className="date-rg">
                    {format(dates[0].startDate, "MM-dd-yyyy")}
                  </div>
                </div>

                <div className="date-rg-item">
                  <span>End Date</span>
                  <div className="date-rg">
                    {format(dates[0].endDate, "MM-dd-yyyy")}
                  </div>
                </div>
              </div>
              <>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date-select"
                    minDate={new Date()}
                  />
                )}
              </>
            </div>

            <div className="input-item col-12 col-md-2">
              <button className="header-submit-btn" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
