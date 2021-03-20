import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import "./SignUp.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase.Config";
import { UserContext } from "../../App";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const SignUp = () => {
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

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
        var errorCode = error.code;
        var errorMessage = error.message;

        // ...
      });
    e.preventDefault();
  };

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
    if (e.target.name === "confirm") {
      if (e.target.value === user.password) {
        isFormValid = true;
      } else {
        isFormValid = false;
      }
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  console.log(user);
  const handleSignUp = (e) => {
    if (user.email && user.password && user.confirm) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
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
        });
    }
    e.preventDefault();
  };
  return (
    <div>
      <Container>
        <div className="signup_box">
          <form onSubmit={handleSignUp}>
            <h3>Register</h3>

            <div className="form-group">
              <label>Name</label>
              <input
                onBlur={handleBlurSignUp}
                name="name"
                type="text"
                className="form-control"
                placeholder=" Name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                onBlur={handleBlurSignUp}
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter email"
                required
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
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                onBlur={handleBlurSignUp}
                name="confirm"
                type="password"
                className="form-control"
                placeholder="Confirm password"
                required
              />
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">
              Register
            </button>
            <p className="forgot-password text-right">
              Already registered{" "}
              <Link to="/login">
                <a href="/login">log in?</a>
              </Link>
            </p>
          </form>
          <div>
            <button onClick={googleLogin}>Google sign in</button>
          </div>
          <p style={{ color: "red" }}>{user.error}</p>
          {user.success && (
            <p style={{ color: "green" }}>User Created Successfully</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
