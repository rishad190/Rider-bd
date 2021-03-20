import React, { useContext } from "react";
import { Nav, Navbar, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  console.log(user);
  return (
    <div>
      <Container>
        <Navbar expand="lg">
          <Navbar.Brand href="/home">Riders_Bangladesh</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/destination">Destination</Nav.Link>
              <Nav.Link href="/blog">Blog</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>

            <Link to="/signup">
              {user.success && <h3>{user.name}</h3>}
              {!user.success && (
                <Button variant="outline-success">Login</Button>
              )}
            </Link>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default Header;
