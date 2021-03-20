import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Transport.css";

const Transport = (props) => {
  const { name, image, id } = props.data;

  return (
    <div>
      <div className="data_box">
        <Link to={`/destination/${id}`}>
          <Button>
            <img src={image} alt="" />
            <h2>{name}</h2>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Transport;
