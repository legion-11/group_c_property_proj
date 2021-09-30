import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, Row, Col, Button, NavDropdown} from 'react-bootstrap'
import {useEffect, useState} from "react";
import {useState} from "react";
import {Route, Switch, BrowserRouter, Redirect} from "react-router-dom";
import SignIn from "./components/signIn";
import Error from "./components/404";
import UserDataService from './services/user'
import SignUp from "./components/signUp";
import PropertiesList from "./components/properties";
import AddProperty from "./components/addProperty";

// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
// Services
import UserDataService from './services/user';
// Components
import SignIn from "./Pages/SignIn";
import Error from "./Pages/404";
import SignUp from "./Pages/SignUp";
import Landing from "./Pages/Landing";
import Property from "./Pages/Property";
import Header from "./components/Header";

function App() {

  const [user, setUser] = useLocalStorage("user", null);

  async function signUp(formData = null) {
    UserDataService.signUp(formData)
      .then((response) => {
        if (!response.data.success) {alert(response.data.msg)}
      })
      .catch((e) => {
        alert(e.message)
      })
  }

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
      .then(()=>{
        setUser(null)
      })
      .catch((e) => {
        alert(e.message)
      })
  }

  return (
      <div className="App">
        <Header user={user} logout={logout}/>
        <header className="header">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Property Chain Project</Navbar.Brand>
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
                        <NavDropdown.Item href="/addProperty">Add property</NavDropdown.Item>
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
            <Route exact path="/">
              <Landing setUser={setUser}/>
            </Route>
            <Route exact path="/properties">
              <Property/>
            </Route>
            <Route exact path={["/", "/properties"]} component={PropertiesList} />
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
                <SignUp {...props} signUp={signUp}/>
              )}
            />
            <Route
              path="/addProperty"
              render={(props) => (
                <AddProperty {...props} user={user}/>
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
  );
}

export default App;
