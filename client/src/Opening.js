import React from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import "./Opening.css";

const Opening = ({isAuthenticated}) => {
  if (isAuthenticated) {
    return <Redirect to="/vacations" />;
  }

  return (
    <section className="opening">
      <div className="dark-overlay">
        <div className="landing-inner">
          <p className="lead" />
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Opening.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Opening);
