import React, { createContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Loading from "./Loading";
import { url } from "../Urls";

const Home = () => {
  const [search,setSearch] = useState("")
  const [food, setFood] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);


  const fetchedData = async () => {
    try {
      const response = await fetch(`https://${url}/ayush/fooddata`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });
      const json = await response.json();
      setFood(json[0]);
      setFoodCategory(json[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchedData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div>
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            style={{ objectFit: "contain !important" }}
          >
            <div className="carousel-inner" id="carousel">
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <div className="d-flex justify-content-center">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                  />
                  {/* <button
                    className="btn btn-outline-success my-2 my-sm-0 bg-success text-white"
                    type="submit"
                  > 
                    Search
                  </button>
                  */}
                </div>
              </div>
              <div className="carousel-item active">
                <img
                  src="https://source.unsplash.com/random/300*300/?friedrice"
                  className="d-block w-100"
                  alt="..."
                  style={{ filter: "brightness(45%)" , objectFit:"fill"}}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/300*300/?tea,coffee"
                  className="d-block w-100"
                  alt="..."
                  style={{ filter: "brightness(45%)", objectFit:"fill" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/300*300/?paneer,salad"
                  className="d-block w-100"
                  alt="..."
                  style={{ filter: "brightness(45%)", objectFit:"fill" }}
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        {foodCategory.length > 0 ? (
          foodCategory.map((category) => (
            <div key={category._id} className="mb-4">
              <h3 className="fs-4">{category.CategoryName}</h3>
              <hr />
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {food
                  .filter((item) => (item.CategoryName === category.CategoryName)&&(item.name.toLowerCase().includes(search.toLowerCase())))
                  .map((itemss) => (
                    <div key={itemss._id} className="col-12 col-md-6 col-lg-4">
                      <Card
                        foodData={itemss}
                        options={itemss.options}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div>Data not found.</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
