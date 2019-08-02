import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import "./OneVacation.css";
import {addFollow, removeFollow, deleteVacation} from "./actions/vacation";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import EditModal from "./EditModal";


const OneVacation = ({
  auth: {loading, user, isAuthenticated},
  vacationsFollowedByUser,
  addFollow,
  deleteVacation,
  removeFollow,
  vacation: {vacationID, Descripe, Img, startDate, endDate, Price}
}) => {
  let isFollowed;
  if (
    vacationsFollowedByUser.find(vacation => vacation.vacationID === vacationID)
  ) {
    isFollowed = true;
  }

  return (
    <Card className="card">
      <img src={Img} style={{width: "100%", height: "16rem"}} />

      <div className="container">
        <h1>{Descripe}</h1>
        <p className="price">Price:{Price}$</p>
        <p>startDate:{startDate}</p>
        <p>endDate:{endDate}</p>

        {!loading && !user.isAdmin && (
          <button
            className="btn btn-danger"
            onClick={e =>
              isFollowed ? removeFollow(vacationID) : addFollow(vacationID)
            }
          >
            {isFollowed ? "unfollow" : "follow"}
          </button>
        )}
      </div>
      {!loading && user.isAdmin ? (
        <div className="row">
          <div className="col">
            <button
              onClick={e => deleteVacation(vacationID)}
              className="btn btn-danger btn-rounded"
            >
              Delete
            </button>
          </div>
          <div className="col">
            <EditModal vacationId={vacationID} />
          </div>
        </div>
      ) : null}
    </Card>
  );
};
OneVacation.propTypes = {
  vacation: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addFollow: PropTypes.func.isRequired,
  removeFollow: PropTypes.func.isRequired,
  vacationsFollowedByUser: PropTypes.array.isRequired,
  deleteVacation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  vacationsFollowedByUser: state.vacation.vacationsFollowedByUser
});

export default connect(
  mapStateToProps,
  {addFollow, removeFollow, deleteVacation}
)(OneVacation);
