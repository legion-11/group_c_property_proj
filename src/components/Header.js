import React from 'react';
import {Container, Nav, Navbar, Button, NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function Header({user, logout}) {

    return (
          <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
            <Container>
            <Link className="text-decoration-none" to="/"><Navbar.Brand>Property Chain</Navbar.Brand></Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Link className="text-decoration-none" to="/properties"><Nav.Link as="span">View Properties</Nav.Link></Link>
                <Link className="text-decoration-none" to="/transactions"><Nav.Link as="span">View All Transactions</Nav.Link></Link>
                </Nav>
                {
                  user ? (
                    <Nav>
                      <NavDropdown title={user.firstname} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">My property</NavDropdown.Item>
                        <NavDropdown.Item href="/addProperty">Add property</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Personal Info</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  ) : (
                    <Nav>
                      <Link to="/"><Button variant="outline-success">Sign In</Button></Link>
                    </Nav>
                  )
                }

              </Navbar.Collapse>
            </Container>
          </Navbar>
    )
}