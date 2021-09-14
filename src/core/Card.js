import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Link, Redirect } from "react-router-dom";

const Card = ({ product }) => {
  const cartTitle = product ? product.name : "A photo from pexels";
  const url = `/product/${product._id}`;
  console.log("PP", product);
  return (
    <Link to={{ pathname: url, product: product }}>
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header display-5">{cartTitle}</div>
        <div className="card-body">
          <img
            src="https://st2.depositphotos.com/1350793/8441/i/950/depositphotos_84416316-stock-photo-hand-pointing-to-online-course.jpg"
            alt="photo1"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            className="mb-3 rounded"
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
