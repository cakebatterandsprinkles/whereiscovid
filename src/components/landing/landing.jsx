import React, { PureComponent } from "react";
import countryCoordinates from "../../data/countries.json";
import stateCoordinates from "../../data/states.json";
import classes from "./landing.module.css";

class Landing extends PureComponent {
  retrieveWorldData() {
    return fetch("https://disease.sh/v3/covid-19/countries")
      .then((blob) => blob.json())
      .then((data) =>
        this.setState({
          mainWorldData: data.map((country) => {
            return {
              ...country,
              latitude:
                countryCoordinates.filter(
                  (coord) => coord.name === country.country
                )[0] !== undefined
                  ? countryCoordinates.filter(
                      (coord) => coord.name === country.country
                    )[0].lat
                  : 0,
              longitude:
                countryCoordinates.filter(
                  (coord) => coord.name === country.country
                )[0] !== undefined
                  ? countryCoordinates.filter(
                      (coord) => coord.name === country.country
                    )[0].lng
                  : 0,
            };
          }),
        })
      );
  }

  retrieveStateData() {
    return fetch("https://disease.sh/v3/covid-19/states")
      .then((blob) => blob.json())
      .then((data) =>
        this.setState({
          mainStateData: data.map((usState) => {
            return {
              ...usState,
              latitude:
                stateCoordinates.filter(
                  (coord) => coord.name === usState.state
                )[0] !== undefined
                  ? stateCoordinates.filter(
                      (coord) => coord.name === usState.state
                    )[0].lat
                  : 37.0902,
              longitude:
                stateCoordinates.filter(
                  (coord) => coord.name === usState.state
                )[0] !== undefined
                  ? stateCoordinates.filter(
                      (coord) => coord.name === usState.state
                    )[0].lng
                  : -95.7129,
            };
          }),
        })
      );
  }

  getUserLocation() {
    return fetch("https://freegeoip.app/json/").then((blob) => blob.json());
  }

  constructor() {
    super();
    this.state = {
      mainWorldData: [],
      mainStateData: [],
      userLocation: null,
      locationDeath: 0,
      locationTodayDeath: 0,
      locationCase: 0,
      locationTodayCase: 0,
    };
  }
  componentDidMount() {
    Promise.all([
      this.retrieveStateData(),
      this.retrieveWorldData(),
      this.getUserLocation(),
    ])
      .then((data) => ({
        country: this.state.mainWorldData.filter(
          (countryData) => countryData.countryInfo.iso2 === data[2].country_code
        )[0],
        state: this.state.mainStateData.filter(
          (stateData) => stateData.state === data[2].region_name
        )[0],
      }))
      .then((data) =>
        this.setState({
          userLocation: data.state ? data.state.state : data.country.country,
          locationDeath: data.state ? data.state.deaths : data.country.deaths,
          locationTodayDeath: data.state
            ? data.state.todayDeaths
            : data.country.todayDeaths,
          locationCase: data.state ? data.state.cases : data.country.cases,
          locationTodayCase: data.state
            ? data.state.todayCases
            : data.country.todayCases,
        })
      );
  }

  render() {
    return (
      <div className={classes.mainContainer}>
        <div className={classes.innerContainer}>
          <p>
            It appears that you&apos;re connecting from{" "}
            <span className={classes.countryName}>
              {this.state.userLocation}
            </span>
            .{" "}
          </p>
          <p>
            The latest data for{" "}
            <span className={classes.countryName}>
              {" "}
              {this.state.userLocation}{" "}
            </span>{" "}
            is as follows:{" "}
          </p>
          <div>
            <p>
              {" "}
              Total Cases:{" "}
              <span className={classes.case}>
                {this.state.locationCase.toLocaleString()}{" "}
              </span>
            </p>
            <p>
              {" "}
              Cases Reported Today:{" "}
              <span className={classes.case}>
                {this.state.locationTodayCase.toLocaleString()}{" "}
              </span>
            </p>
            <p>
              {" "}
              Total Deaths:{" "}
              <span className={classes.death}>
                {this.state.locationDeath.toLocaleString()}{" "}
              </span>
            </p>
            <p>
              {" "}
              Deaths Reported Today:{" "}
              <span className={classes.death}>
                {this.state.locationTodayDeath.toLocaleString()}{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
