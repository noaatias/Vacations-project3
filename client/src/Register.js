import React, {Fragment, useState} from "react";
import "./Register.css";
import {Route, Link, BrowserRouter as Router} from "react-router-dom";
import {register} from "./actions/auth";
import {setAlert} from "./actions/alert";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";

const Register = ({setAlert, register, isAuthenticated}) => {
  const initialFormState = {
    userName: "",
    lastName: "",
    Email: "",
    password: ""
  };
  const [formData, setFormData] = useState(initialFormState);

  const clearFormData = () => {
    setFormData({...initialFormState});
  };

  const {userName, lastName, Email, password} = formData;

  const onChange = e =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();

    register(userName, lastName, Email, password);
    clearFormData();
  };

  if (isAuthenticated) {
    return <Redirect to="/Vacations" />;
  }

  return (
    <Fragment>
      <div className="regi">
        <form className="form" onSubmit={e => onSubmit(e)}>
          <h3 className="large register">Register</h3>
          <p className="lead">
            <i className="fas fa-user" /> Create Your Account
          </p>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              name="userName"
              value={userName}
              onChange={e => onChange(e)}
              // required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={e => onChange(e)}
              // required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="Email"
              value={Email}
              onChange={e => onChange(e)}
              // required
            />
          </div>
          <div className="form-group">
            <input
              type="Password"
              placeholder="Password"
              name="password"
              // minLength='6'
              value={password}
              onChange={e => onChange(e)}
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Register" />
          <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  {
    setAlert,
    register
  }
)(Register);
