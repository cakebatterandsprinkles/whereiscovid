import React, { PureComponent } from "react";
import classes from "./countryMarker.module.css";

class CountryMarker extends PureComponent {
  constructor() {
    super();
    this.state = {
      activeClass: null,
    };
    this.handleMouseover = this.handleMouseover.bind(this);
    this.handleMouseout = this.handleMouseout.bind(this);
  }
  chooseColor = (value) => {
    if (value === "cases" || value === "todayCases") {
      return classes.red;
    } if (value === "deaths" || value === "todayDeaths") {
      return classes.gray;
    } if (value === "recovered") {
      return classes.green;
    } if (value === "active") {
      return classes.yellow;
    } if (value === "critical") {
      return classes.orange;
    } if (value === "casesPerOneMillion") {
      return classes.purple;
    }
    return classes.red;
  };
  calculateSize = (value) => {
    if (value < 100) {
      return classes.small;
    } if (value < 1000) {
      return classes.medium;
    } if (value < 10000) {
      return classes.large;
    } if (value < 100000) {
      return classes.x_large;
    } if (value < 1000000) {
      return classes.xx_large;
    } if (value >= 1000000) {
      return classes.xxx_large;
    }
  };

  handleMouseover() {
    this.setState({ activeClass: classes.inverted });
  }
  handleMouseout() {
    this.setState({ activeClass: null });
  }

  render() {
    const displayedValue = this.props.data[this.props.sortBy];
    if (displayedValue === 0) {
      return null;
    }
    const sizeClass = this.calculateSize(displayedValue);
    const colorClass = this.chooseColor(this.props.sortBy);

    return (
      <div
        className={`${classes.marker} ${sizeClass} ${colorClass} ${this.state.activeClass}`}
        onClick={this.props.onClick}
        onMouseLeave={this.handleMouseout}
        onMouseOver={this.handleMouseover}
      >
        {displayedValue.toLocaleString()}
      </div>
    );
  }
}

export default CountryMarker;
