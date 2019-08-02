import OneVacation from "./OneVacation";
import "./AllVacations.css";
import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import differenceBy from "lodash.differenceby";
import {getVacations, getVacationsfollowedByUser} from "./actions/vacation";
import VacationForm from "./VacationForm";
import {MDBRow} from "mdbreact";

const AllVacations = ({
  auth: {isAuthenticated, user},
  getVacations,
  getVacationsfollowedByUser,
  vacation: {vacations, vacationsFollowedByUser}
}) => {
  useEffect(() => {
    getVacations();
    getVacationsfollowedByUser();
    const interval = setInterval(() => {
      //call to the get vacations every 3 seconds
      getVacations();
      getVacationsfollowedByUser();
      console.log("get");
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  //
  var vacationsNotFollowed = differenceBy(
    vacations,
    vacationsFollowedByUser,
    "vacationID"
  );

  return (
    <div>
      {user ? (
        <Fragment>
          {isAuthenticated && user.isAdmin ? (
            <MDBRow>
              <VacationForm />
            </MDBRow>
          ) : null}
          <div className="container">
            {vacationsFollowedByUser.map((
              vacation //vacation that followed
            ) => (
              <OneVacation key={vacation.vacationID} vacation={vacation} />
            ))}
            {vacationsNotFollowed.map((
              vacation //vacation that not followed
            ) => (
              <OneVacation key={vacation.vacationID} vacation={vacation} />
            ))}
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};

AllVacations.propTypes = {
  getVacations: PropTypes.func.isRequired,
  vacation: PropTypes.object.isRequired,
  getVacationsfollowedByUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vacation: state.vacation,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {getVacations, getVacationsfollowedByUser}
)(AllVacations);
