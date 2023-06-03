import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useRentFetch from "../hooks/useRentFetch";

export default function Search() {
  const navigation = useLocation();

  const [dates, setDates] = useState(navigation.state.dates[0]);
  const [category, setCategory] = useState(navigation.state.category);
  const [location, setLocation] = useState(navigation.state.location);

  console.log(
    dates?.endDate.toDateString(),
    dates?.startDate.toDateString(),
    category,
    location
  );

  const { data, loading, error, reFetch } = useRentFetch(
    `api/items?city=${location}&type=${category}&endtime=${dates?.endDate}&starttime=${dates?.startDate}`
  );

  console.log(loading, data, error);

  return (
    <div className="container">
      <div className="row search-wrapper mt-4">
        <div className="col-4">
          <div className="card">filter</div>
        </div>
        <div className="col items-wrapper">
          <div className="card">items</div>
          <div className="card">items</div>
          <div className="card">items</div>
          <div className="card">items</div>
        </div>
      </div>
    </div>
  );
}
