import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import fakeData from "../fakeData/fakeData.json";
import "./Destination.css";

const Destination = () => {
  const [show, setShow] = useState({
    place1: "",
    place2: "",
    showAllData: false,
  });
  const { transport } = useParams();
  const number = parseInt(transport);

  const vechiel = fakeData.find((pd) => pd.id === number);
  const { name, Price, image } = vechiel;

  const handleData = (e) => {
    console.log(e.target.name);
  };
  const showData = () => {
    const newData = { ...show };
    newData.showAllData = true;

    setShow(newData);
  };
  return (
    <div className="destination_box">
      <Container>
        <Row>
          <Col>
            {show.showAllData && (
              <div>
                <div className="main_box">
                  <div className="distance">
                    <h1>Mirpur</h1>
                    <h1>Dhanmondi</h1>
                  </div>
                  <div className="info_box">
                    <img src={image} alt="" />
                    <p>{name}</p>
                    <p>${Price}</p>
                  </div>
                  <div className="info_box">
                    <img src={image} alt="" />
                    <p>{name}</p>
                    <p>${Price}</p>
                  </div>
                  <div className="info_box">
                    <img src={image} alt="" />
                    <p>{name}</p>
                    <p>${Price}</p>
                  </div>
                </div>
              </div>
            )}
            {!show.showAllData && (
              <div className="select_box">
                <div className="pick_box">
                  <p>Pick From</p>
                  <select
                    onBlur={handleData}
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected> select From</option>
                    <option value="Mirpur">Mirpur</option>
                    <option value="Dhanmondi">Dhanmondi</option>
                    <option value="Banani">Banani</option>
                  </select>
                </div>
                <div className="pick_box">
                  <p>Pick To</p>
                  <select
                    onBlur={handleData}
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected> select From</option>
                    <option value="Mirpur">Mirpur</option>
                    <option value="Dhanmondi">Dhanmondi</option>
                    <option value="Banani">Banani</option>
                  </select>
                </div>
                <button onClick={showData}>Search</button>
              </div>
            )}
          </Col>
          <Col>
            <div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14608.039147951962!2d90.36710723036111!3d23.74703040345487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cffc3fb%3A0x4a826f475fd312af!2sDhanmondi%2C%20Dhaka%201205!5e0!3m2!1sen!2sbd!4v1616245741553!5m2!1sen!2sbd"></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Destination;
