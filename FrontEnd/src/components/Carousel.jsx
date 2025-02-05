import React from 'react';
import city from '../images/city.jpg';

const Carousel = () => {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form className="d-flex">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0 bg-success text-white" type="submit">Search</button>
            </form>
          </div>
          <div className="carousel-item active">
            <img src={city} alt="city" style={{ filter: "brightness(45%)" }} />
          </div>
          <div className="carousel-item">
            <img src={city} className="d-block w-100" alt="city" style={{ filter: "brightness(45%)" }} />
          </div>
          <div className="carousel-item">
            <img src={city} className="d-block w-100" alt="city" style={{ filter: "brightness(45%)" }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
