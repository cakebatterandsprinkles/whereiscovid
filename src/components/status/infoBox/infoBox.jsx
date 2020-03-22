import React from "react";
import classes from "./infoBox.module.css";

function InfoBox(props) {
  return (
    <div className={classes.info__container}>
      <ul>
        <li>Cases: {props.countryData.cases}</li>
        <li>Today's Cases: {props.countryData.todayCases}</li>
        <li>Deaths: {props.countryData.deaths}</li>
        <li>Today's Deaths: {props.countryData.todayDeaths}</li>
        <li>Recovered: {props.countryData.recovered}</li>
        <li>Active: {props.countryData.active}</li>
        <li>Critical: {props.countryData.critical}</li>
        <li>Cases Per One Million: {props.countryData.casesPerOneMillion}</li>
      </ul>
    </div>
  );
}

export default InfoBox;
