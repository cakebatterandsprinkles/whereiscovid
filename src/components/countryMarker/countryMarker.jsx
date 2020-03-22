import React, { PureComponent } from "react";
import classes from "./countryMarker.module.css";

class CountryMarker extends PureComponent {
  chooseColor = value => {
    if (value === "cases" || value === "todayCases") {
      return classes.red;
    } else if (value === "deaths" || value === "todayDeaths") {
      return classes.gray;
    } else if (value === "recovered") {
      return classes.green;
    } else if (value === "active") {
      return classes.yellow;
    } else if (value === "critical") {
      return classes.orange;
    } else if (value === "casesPerOneMillion") {
      return classes.purple;
    }
    return classes.red;
  };
  calculateSize = value => {
    if (value < 100) {
      return classes.small;
    } else if (value < 500) {
      return classes.medium;
    } else if (value < 2000) {
      return classes.large;
    } else if (value >= 2000) {
      return classes.x_large;
    }
  };
  render() {
    const displayedValue = this.props.data[this.props.sortBy];
    if (displayedValue === 0) {
      return null;
    }
    const sizeClass = this.calculateSize(displayedValue);
    const colorClass = this.chooseColor(this.props.sortBy);

    return (
      <div className={`${classes.marker} ${sizeClass} ${colorClass}`}>
        {displayedValue.toLocaleString()}
      </div>
    );
  }
}

export default CountryMarker;
