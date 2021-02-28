import React, { useEffect, useState } from "react";
import { Player } from "video-react";
import "../../node_modules/video-react/dist/video-react.css";
import { getProduct } from "../admin/helper/adminapicall";
import Base from "../core/Base";

const UserDashBoard = (props) => {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    console.log(props.match.params);
    getProduct(props.match.params.productId).then((data) => {
      console.log(data);
      setProduct(data);
    });
  }, []);
  console.log(product);
  return (
    <Base title={product?.name} description={product?.description}>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: 50,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ width: "90%" }}>
          <Player playsInline poster="/assets/poster.png" src={product?.file} />
        </div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
