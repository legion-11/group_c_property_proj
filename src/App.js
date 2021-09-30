import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, Row, Col, Button, NavDropdown} from 'react-bootstrap'
import {useState} from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import UserDataService from './services/user'
import Property from"./Pages/Property";
import PropertiesList from "./components/properties";
import AddProperty from "./components/addProperty";
import Error from "./Pages/404";
import Landing from "./Pages/Landing";
import Header from "./components/Header";

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

function App() {

  const [user, setUser] = useLocalStorage("user", null);

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

        <div className="container mt-3">
          <Switch>
            <Route exact path="/">
              <Landing setUser={setUser}/>
            </Route>
            {/*<Route exact path="/properties">*/}
            {/*  <Property/>*/}
            {/*</Route>*/}
            <Route path="/properties" component={PropertiesList} />
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
