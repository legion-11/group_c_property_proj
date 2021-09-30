

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, Row, Col, Button, NavDropdown} from 'react-bootstrap'
import {useState} from "react";
import {Route, Switch, BrowserRouter, Redirect} from "react-router-dom";
import SignIn from "./components/signIn";
import Error from "./components/404";
import UserDataService from './services/user'
import SignUp from "./components/signUp";

function App() {
  const [user, setUser] = useState(null);

  async function login(formData = null) {
    UserDataService.signIn(formData)
      .then((response) => {
        if (response.data.success) {
          setUser(response.data.user)
        } else {alert(response.data.msg)}
      })
      .catch((e) => {
        alert(e.message)
      })
  }

  async function logout() {
    UserDataService.signOut()
      .then(()=>{setUser(null)})
      .catch((e) => {
        alert(e.message)
      })
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Property Chain Project</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/properties">View Properties</Nav.Link>
                  <Nav.Link href="/transactions">View All Transactions</Nav.Link>
                </Nav>
                {
                  user ? (
                    <Nav>
                      <NavDropdown title={user.firstname} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">My property</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Personal Info</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  ) : (
                    <Nav>
                      <Nav.Link href="/signUp" font-size-sm >Sign Up</Nav.Link>
                      <Button variant="outline-success" href="/signIn">Sign In</Button>
                    </Nav>
                  )
                }

              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        <div className="container mt-3">
          <Switch>
            {/*<Route exact path={["/", "/properties"]} component={PropertiesList} />*/}
            {/*<Route*/}
            {/*    path="/properties/:id"*/}
            {/*    render={(props) => (*/}
            {/*        <AddReview {...props} user={user} />*/}
            {/*    )}*/}
            {/*/>*/}
            <Route
              path="/signIn"
              render={(props) => (
                <SignIn {...props} login={login}/>
              )}
            />
            <Route
              path="/signUp"
              render={(props) => (
                <SignUp {...props} />
              )}
            />
            <Route
              path="/404"
              render={(props) => (
                <Error {...props}/>
              )}
            />
            <Redirect to={"/404"}/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
