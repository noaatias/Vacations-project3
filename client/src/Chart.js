import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getVacations} from "./actions/vacation";
import {Bar} from "react-chartjs-2";
var randomColor = require("randomcolor"); // import the script

const Chart = ({vacations, getVacations}) => {
  useEffect(() => {
    getVacations();
    const interval = setInterval(() => {
      getVacations();
    }, 3000);
    return () => clearInterval(interval);
  }, [getVacations]);

  const idArr = vacations.map(({vacationID}) => vacationID);
  const numOfFollowers = vacations.map(({followers}) => followers);
  const descri = vacations.map(({Descripe}) => Descripe);
  let numOfFollowersNew = [];
  let idArrNew = [];
  let descriNew = [];

  for (let index = 0; index < numOfFollowers.length; index++) {
    if (numOfFollowers[index] !== null && numOfFollowers[index] !== 0) {
      numOfFollowersNew.push(numOfFollowers[index]);
      idArrNew.push(idArr[index]);
      descriNew.push(descri[index]);
    }
  }

  let color = 0;
  const data = {
    labels: descriNew,
    datasets: [
      {
        data: numOfFollowersNew,
        backgroundColor: (() => {
          let bgcolors = [];
          for (let i = 0; i < descriNew.length; ++i) {
            color = randomColor({
              luminosity: "bright",
              format: "rgb" 
            });
            bgcolors.push(color);
          }
          return bgcolors;
        })()
      }
    ]
  };
  return (
    <div className="chart">
      <Bar
        data={data}
        options={{
          legend: {
            display: false,
            labels: {
              fontColor: "rgb(255, 99, 132)"
            }
          },
         
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: 5,
                  stepSize: 1,
                  suggestedMin: 0,
                  suggestedMax: 30
                }
              }
            ]
          },
          title: {
            display: true,
            text: "Followers"
          },
          tooltips: {
            callbacks: {}
          }
        }}
      />
    </div>
  );
};
Chart.propTypes = {
  vacation: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  vacations: state.vacation.vacations
});

export default connect(
  mapStateToProps,
  {getVacations}
)(Chart);
