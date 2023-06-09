import React, { useState } from "react";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import useRentFetch from "../hooks/useRentFetch";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useRef } from "react";
import Select from "../components/Select";
import { DateRange } from "react-date-range";
import "../assets/css/pages/search.css";

const places = ["places"];

export default function Search() {
  const navigation = useLocation();
  const autoCompleteRef = useRef();

  const [min, setMin] = useState(1);
  const [max, setMax] = useState(undefined);
  const [dates, setDates] = useState(navigation.state.dates);
  const [category, setCategory] = useState(navigation.state.category);
  const [location, setLocation] = useState(navigation.state.location);
  const [categories, setCategories] = useState(navigation.state.categories);

  const locationRef = useRef(location);

  const [openDate, setOpenDate] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_API_KEY,
    libraries: places,
  });

  const { data, loading, error, reFetch } = useRentFetch(
    `api/items?city=${location}&type=${category}&endtime=${dates[0]?.endDate}&starttime=${dates[0]?.startDate}`
  );

  console.log(loading, data, error);

  const handleSubmit = (e) => {
    e.preventDefault();
    reFetch();
  };

  return (
    <div className="container">
      <div className="row search-wrapper mt-4">
        <div className="col-12 col-md-4 mb-4">
          <div className="card card-body">
            <h4 className="card-title">Search</h4>
            <form className="header-input-form" onSubmit={handleSubmit}>
              <div className="header-input-wraper d-flex flex-column">
                <div className="input-item">
                  <span>Location</span>
                  {!isLoaded ? (
                    <input
                      ref={locationRef}
                      value={location}
                      required
                      onChange={(e) => setLocation(e.target.value)}
                      type="text"
                      placeholder="Location"
                    />
                  ) : (
                    <Autocomplete ref={autoCompleteRef} className="auto-cpl">
                      <input
                        value={location}
                        ref={locationRef}
                        required
                        onChange={() => {}}
                        type="text"
                        placeholder="Location"
                      />
                    </Autocomplete>
                  )}
                </div>

                <div className="input-item">
                  <span>Categories</span>
                  <Select
                    value={category}
                    onChange={setCategory}
                    items={categories}
                  />
                </div>

                <div className="input-item">
                  <div
                    className="date-range d-flex flex-column flex-md-row"
                    onClick={() => setOpenDate(!openDate)}
                  >
                    <div className="date-rg-item">
                      <span>Start Date</span>
                      <div className="date-rg">
                        {format(dates[0]?.startDate, "MM-dd-yyyy")}
                      </div>
                    </div>

                    <div className="date-rg-item">
                      <span>End Date</span>
                      <div className="date-rg">
                        {format(dates[0]?.endDate, "MM-dd-yyyy")}
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

                <div className="input-item">
                  <div className="price-range d-flex flex-column flex-md-row">
                    <div className="price-rg-item">
                      <span>Min Price</span>
                      <input
                        value={min}
                        type="number"
                        onChange={(e) => setMin(e.target.value)}
                      />
                    </div>
                    <div className="price-rg-item">
                      <span>Max Price</span>
                      <input
                        value={max}
                        type="number"
                        onChange={(e) => setMax(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="input-item">
                  <button className="header-submit-btn" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12 col-md-8 items-wrapper">
          <div className="card overflow-hidden mb-4">
            <div className="search-item-wrapper">
              <img
                className="item-pic"
                src="https://www.topgear.com/sites/default/files/2022/07/6_0.jpg"
                alt=""
              />
              <div className="item-dts">
                <div className="title-wrapper">
                  <span className="item-title">Rent my BMW</span>
                  <div className="item-price">
                    <small>Day Price</small>
                    <span>135 €</span>
                  </div>
                </div>
                <span className="item-loc">Frankfurt Am Main</span>
                <p className="item-desc">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit Animi
                  expedita officiis quo, aperiam adipisci vero iste dolore...
                </p>
                <div className="item-dispo">
                  <span>Availability</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card overflow-hidden mb-4">
            <div className="search-item-wrapper">
              <img
                className="item-pic"
                src="https://www.topgear.com/sites/default/files/2022/07/6_0.jpg"
                alt=""
              />
              <div className="item-dts">
                <div className="title-wrapper">
                  <span className="item-title">Rent my BMW</span>
                  <div className="item-price">
                    <small>Day Price</small>
                    <span>135 €</span>
                  </div>
                </div>
                <span className="item-loc">Frankfurt Am Main</span>
                <p className="item-desc">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit Animi
                  expedita officiis quo, aperiam adipisci vero iste dolore...
                </p>
                <div className="item-dispo">
                  <span>Availability</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card overflow-hidden mb-4">
            <div className="search-item-wrapper">
              <img
                className="item-pic"
                src="https://www.topgear.com/sites/default/files/2022/07/6_0.jpg"
                alt=""
              />
              <div className="item-dts">
                <div className="title-wrapper">
                  <span className="item-title">Rent my BMW</span>
                  <div className="item-price">
                    <small>Day Price</small>
                    <span>135 €</span>
                  </div>
                </div>
                <span className="item-loc">Frankfurt Am Main</span>
                <p className="item-desc">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit Animi
                  expedita officiis quo, aperiam adipisci vero iste dolore...
                </p>
                <div className="item-dispo">
                  <span>Availability</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card overflow-hidden mb-4">
            <div className="search-item-wrapper">
              <img
                className="item-pic"
                src="https://www.topgear.com/sites/default/files/2022/07/6_0.jpg"
                alt=""
              />
              <div className="item-dts">
                <div className="title-wrapper">
                  <span className="item-title">Rent my BMW</span>
                  <div className="item-price">
                    <small>Day Price</small>
                    <span>135 €</span>
                  </div>
                </div>
                <span className="item-loc">Frankfurt Am Main</span>
                <p className="item-desc">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit Animi
                  expedita officiis quo, aperiam adipisci vero iste dolore...
                </p>
                <div className="item-dispo">
                  <span>Availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
