import React from "react";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="home-container mb-5">
      <Header />
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
