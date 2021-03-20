import React from "react";
import { Button } from "react-bootstrap";
import "./Transport.css";

const Transport = (props) => {
  const { name, image } = props.data;
  return (
    <div>
      <div className="data_box">
        <Button>
          <img src={image} alt="" />
          <h2>{name}</h2>
        </Button>
      </div>
    </div>
  );
};

export default Transport;
