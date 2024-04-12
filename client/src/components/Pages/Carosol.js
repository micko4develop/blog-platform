import React from "react";

const Carasol = () => {
  return (
    <>
      <div id="demo" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="1"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={'https://fuel.me/wp-content/uploads/2024/04/video-img.jpeg'}
              alt="Los Angeles"
              className="d-block"
            />
          </div>
          <div className="carousel-item">
            <img
              src={'https://fuel.me/wp-content/uploads/2023/02/Transportation-min-scaled.jpg'}
              alt="New York"
              className="d-block"
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </>
  );
};

export default Carasol;
