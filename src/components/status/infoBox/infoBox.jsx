import React from "react";
import classes from "./infoBox.module.css";

function InfoBox(props) {
  return (
    <div className={classes.info__container}>
      <ul className={classes.info__container__ul}>
        <li>
          <span className={classes.info__container__heading}>
            {props.countryData.country}
          </span>
        </li>
        <li>
          <span className={classes.info__container__title}>Cases: &nbsp;</span>{" "}
          {props.countryData.cases.toLocaleString()}
        </li>
        <li>
          <span className={classes.info__container__title}>
            Today's Cases: &nbsp;
          </span>
          {props.countryData.todayCases.toLocaleString()}
        </li>
        <li>
          <span className={classes.info__container__title}>Deaths: &nbsp;</span>
          {props.countryData.deaths.toLocaleString()}
        </li>
        <li>
          <span className={classes.info__container__title}>
            Today's Deaths: &nbsp;
          </span>
          {props.countryData.todayDeaths.toLocaleString()}
        </li>
        <li>
          <span className={classes.info__container__title}>
            Recovered: &nbsp;
          </span>
          {props.countryData.recovered.toLocaleString()}
        </li>
        <li>
          <span className={classes.info__container__title}>Active: &nbsp;</span>
          {props.countryData.active.toLocaleString()}
        </li>
        <li>
          <span className={classes.info__container__title}>
            Critical: &nbsp;
          </span>
          {props.countryData.critical.toLocaleString()}
        </li>
        <li>
          <span className={classes.info__container__title}>
            Cases Per One Million: &nbsp;
          </span>
          {props.countryData.casesPerOneMillion.toLocaleString()}
        </li>
      </ul>
    </div>
  );
}

export default InfoBox;
