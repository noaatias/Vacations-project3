import React, {Fragment, useState} from "react";
import {Route, Link, BrowserRouter as Router} from "react-router-dom";
import {Redirect} from "react-router-dom";
import "./Login.css";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login} from "./actions/auth";

const Login = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    Email: "",
    password: ""
  });

  const {Email, password} = formData;

  const onChange = e =>//change the data of user
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    login(Email, password);
  };

  if (isAuthenticated) {//if the user is Authenticated go to vacations
    return <Redirect to="/Vacations" />;
  }

  return (
    <Fragment>
      <div className="logi">
        <form className="form" onSubmit={e => onSubmit(e)}>
          <h1 className="large login">Sign In</h1>
          <p className="lead">
            <i className="fas fa-user" /> Sign Into Your Account
          </p>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              name="Email"
              value={Email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
          <p className="my-1">
            Don`t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  {login}
)(Login);
