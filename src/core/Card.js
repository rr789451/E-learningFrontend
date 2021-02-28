import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Link, Redirect } from "react-router-dom";

const Card = ({ product }) => {
  const cartTitle = product ? product.name : "A photo from pexels";
  const url = `/product/${product._id}`
  return (
    <Link to={url}>
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        <ImageHelper product={product} />
      </div>
    </div>
    </Link>
  );
};

export default Card;
