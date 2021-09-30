import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import {Route, Switch, BrowserRouter, Redirect} from "react-router-dom";
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
        <Header user={user} logout={logout}/>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/">
              <Landing setUser={setUser}/>
            </Route>
            <Route exact path="/properties"> 
              <Property/>
            </Route>
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
