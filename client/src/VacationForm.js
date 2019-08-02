import React, {Fragment, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput
} from "mdbreact";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {newVacation} from "./actions/vacation";
const VacationForm = ({newVacation, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    Descripe: "",
    Price: "",
    Img: "",
    startDate: "",
    endDate: ""
  });
  const [displayModal, toggleModal] = useState(false);

  const {Descripe, startDate, endDate, Price, Img} = formData;

  const onChange = e =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();

    if (isAuthenticated) {
      toggleModal(!displayModal);
      newVacation(formData);
      setFormData({
        Descripe: "",
        Price: "",
        Img: "",
        startDate: "",
        endDate: ""
      });
    }
  };

  return (
    <div>
      <MDBBtn onClick={e => toggleModal(!displayModal)}>add new</MDBBtn>
      {displayModal && (
        <MDBModal isOpen={true}>
          <MDBModalHeader toggle={() => toggleModal(!displayModal)}>
            Add vacation
          </MDBModalHeader>
          <form onSubmit={e => onSubmit(e)}>
            <MDBModalBody>
              <div className="form-group">
                <MDBRow>
                  <MDBCol>
                    {" "}
                    <MDBInput
                      name="Descripe"
                      label="Vacation description"
                      onChange={e => onChange(e)}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      name="Img"
                      label="Image"
                      onChange={e => onChange(e)}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol size={6}>
                    <MDBInput
                      type="date"
                      name="startDate"
                      label="start Date"
                      onChange={e => onChange(e)}
                    />
                  </MDBCol>
                  <MDBCol size={6}>
                    <MDBInput
                      type="date"
                      name="endDate"
                      label="end Date"
                      onChange={e => onChange(e)}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    {" "}
                    <MDBInput
                      name="Price"
                      label="Price"
                      onChange={e => onChange(e)}
                    />
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => toggleModal(!displayModal)}
              >
                Close
              </MDBBtn>
              <MDBBtn color="primary" type="submit">
                add vacation
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModal>
      )}
    </div>
  );
};

VacationForm.propTypes = {
  newVacation: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  {newVacation}
)(VacationForm);
