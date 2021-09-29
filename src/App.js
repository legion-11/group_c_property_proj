

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, Row, Col, Button} from 'react-bootstrap'
import {useState} from "react";
import {Route, Switch, BrowserRouter, Redirect} from "react-router-dom";
import SignIn from "./components/signIn";
import Error from "./components/404";
import UserDataService from './services/user'

function App() {
  const [user, setUser] = useState(null);

  async function login(formData = null) {
    UserDataService.signIn(formData)
      .then((response) => {
        if (response.data.success) {
          setUser(response.data.user)
        }
        alert(response.data.msg)
      })
      .catch((e) => {
        alert(e.message)
      })
  }

  async function logout() {
    setUser(null)
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
                      <Nav.Link onClick={logout}>Sign Out</Nav.Link>
                    </Nav>
                  ) : (
                    <Nav>
                        <Nav.Link href="/signIn" font-size-sm >Sign In</Nav.Link>
                        <Nav.Link href="/signUp" font-size-sm>Sign Up</Nav.Link>
                    </Nav>
                  )
                }

              </Navbar.Collapse>
            </Container>
          </Navbar>
          {/*<section className="banner">*/}
          {/*  <Container className="p-4">*/}
          {/*    <Row>*/}
          {/*      <Col sm="8">*/}
          {/*        <h1>Welcome to the Land Chain Project</h1>*/}
          {/*        <p>Link your property to the chain.</p>*/}
          {/*        <hr/>*/}
          {/*        <Button>Get Started</Button>*/}
          {/*      </Col>*/}
          {/*    </Row>*/}
          {/*  </Container>*/}
          {/*</section>*/}
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
              path="/404"
              render={(props) => (
                <Error {...props} login={login}/>
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
