import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp";
import { createContext, useState } from "react";
import Destination from "./Components/Destination/Destination";
import PrivateRoute from "./Components/PrivateRouter/PrivateRouter";
import Header from "./Components/Header/Header";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    error: "",
    password: "",
    success: false,
  });
  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/signup">
              <SignUp></SignUp>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/destination/:transport">
              <Destination></Destination>
            </PrivateRoute>
            <Route path="/">
              <Home />
            </Route>
            <Route path="*">
              <h1>Error</h1>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
