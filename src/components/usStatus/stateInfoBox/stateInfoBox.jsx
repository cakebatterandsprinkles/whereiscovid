import React from "react";
import classes from "./stateInfoBox.module.css";

function StateInfoBox(props) {
  return (
    <div className={classes.info__container}>
      <ul className={classes.info__container__ul}>
        <li>
          <span className={classes.info__container__heading}>
            {props.stateData.state}
          </span>
        </li>
        <li>
          <span className={classes.info__container__title}>Cases: &nbsp;</span>{" "}
          {props.stateData.cases.toLocaleString()}
        </li>
        <li>
          <span className={classes.info__container__title}>
            Today's Cases: &nbsp;
          </span>
          {props.stateData.todayCases.toLocaleString()}
        </li>
        <li>
          <span className={classes.info__container__title}>Deaths: &nbsp;</span>
          {props.stateData.deaths.toLocaleString()}
        </li>
        <li>
          <span className={classes.info__container__title}>
            Today's Deaths: &nbsp;
          </span>
          {props.stateData.todayDeaths.toLocaleString()}
        </li>
        <li>
          <span className={classes.info__container__title}>Active: &nbsp;</span>
          {props.stateData.active.toLocaleString()}
        </li>
      </ul>
    </div>
  );
}

export default StateInfoBox;
