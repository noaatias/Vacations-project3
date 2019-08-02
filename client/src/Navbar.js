import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "./actions/auth";
import "./Navbar.css";

import React, {Fragment} from "react";

const Navbar = ({auth: {isAuthenticated, loading, user}, logout}) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/Vacations">Vacations</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />
          {"  "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
      <li>
        <Link to="/Vacations">Vacations</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />
          {"  "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className="navbar ">
        <h1>
          <Link to="/" className="title">
            <i className="title" /> My Vacations
          </Link>
        </h1>
        {!loading && (
          <div>
            {isAuthenticated && user !== null && user.isAdmin
              ? adminLinks
              : isAuthenticated
              ? authLinks
              : guestLinks}
          </div>
        )}
      </nav>
    </div>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {logout}
)(Navbar);
