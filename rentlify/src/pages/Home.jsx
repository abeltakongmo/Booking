import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../assets/css/pages/home.css";
import { loadCategories } from "../services/services";

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const res = await loadCategories();
      if (res?.data) {
        setCategories(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(categories);

  return (
    <div className="home-container mb-5">
      <Header categories={categories} />
      <section className="mt-4">
        <div className="container">
          <div className="card card-body">
            <h4>Latest Rentals</h4>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <div className="container">
          <div className="card card-body">
            <h4>Most common categories</h4>
            <div className="row category-wrapper">
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

      <section className="mt-4">
        <div className="container">
          <div className="card card-body">
            <h4>Most popular users</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
