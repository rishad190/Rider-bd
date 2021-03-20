import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import fakeData from "../fakeData/fakeData.json";
import Header from "../Header/Header";
import Transport from "../Transport/Transport";
import "./Home.css";

const Home = () => {
  const [transport, setTransport] = useState([]);
  useEffect(() => {
    setTransport(fakeData);
  }, []);

  return (
    <div className="home_back">
      <Container>
        <div className="transport_box">
          {transport.map((tp) => (
            <Transport data={tp} key={tp.id}></Transport>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
