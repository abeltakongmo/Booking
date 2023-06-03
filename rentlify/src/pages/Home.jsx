import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../assets/css/pages/home.css";
import { loadCategories, loadRentItems } from "../services/services";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [rentItems, setRentItems] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await loadCategories();
      const resItems = await loadRentItems();
      if (res?.data) {
        setCategories(res.data);
      }
      if (resItems?.data) {
        setRentItems(resItems.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-container mb-5">
      <Header categories={categories} />
      <section className="mt-5">
        <div className="container">
          <div className="card card-body">
            <h4>Latest Rentals</h4>
            <div className="row rentals-wrapper mt-2">
              {rentItems.map((rent) => (
                <div className="col-12 col-md-4 rent-item" key={rent?._id}>
                  <img
                    className="cat-cover"
                    src={rent?.photos[0]}
                    alt={rent?.name}
                  />
                  <div className="d-flex align-items-center justify-content-between p-1">
                    <span className="rent-item-name">{rent?.name}</span>
                    <span>{rent?.cheapestPrice} €</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="container">
          <div className="card card-body">
            <h4>Most common categories</h4>
            <div className="row category-wrapper mt-2">
              {categories.map((category) => (
                <div
                  className="col-12 col-md-4 category-item"
                  key={category?._id}
                >
                  <img
                    className="cat-cover"
                    src={category?.image}
                    alt={category?.name}
                  />
                  <span className="category-item-name">{category?.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="container">
          <div className="card card-body">
            <h4>Most popular users</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
