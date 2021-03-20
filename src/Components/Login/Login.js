import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../../App";
import "./Login.css";

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase.Config";
import { useHistory, useLocation } from "react-router";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleBlurSignUp = (e) => {
    let isFormValid = true;

    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const passwordValid = e.target.value.length > 6;
      const passwordNumber = /\d{1}/.test(e.target.value);
      isFormValid = passwordValid && passwordNumber;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
    }
  };

  const googleLogin = (e) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signInDetails = {
          name: displayName,
          email: email,
          success: true,
        };
        setUser(signInDetails);
        history.replace(from);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.

        var errorMessage = error.message;
        console.log(errorMessage);

        // ...
      });
    e.preventDefault();
  };

  const handleLogin = (e) => {
    if (user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          history.replace(from);

          // ...
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;

          setUser(newUserInfo);
          console.log(error.message);
        });
      e.preventDefault();
    }
  };
  return (
    <div>
      <Container>
        <div className="login_box">
          <form onSubmit={handleLogin}>
            <h3>Log in</h3>

            <div className="form-group">
              <label>Email</label>
              <input
                onBlur={handleBlurSignUp}
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                onBlur={handleBlurSignUp}
                name="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">
              Sign in
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
          <div className="google_btn">
            <button onClick={googleLogin}>
              <p>Continue with Google</p>
            </button>
          </div>
          {user.success && (
            <p style={{ color: "green" }}>User Login Successfully</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Login;
