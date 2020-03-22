import React, { PureComponent } from "react";
import classes from "./countryMarker.module.css";

class CountryMarker extends PureComponent {
  constructor() {
    super();
    this.state = {
      activeClass: null
    };
    this.handleMouseover = this.handleMouseover.bind(this);
    this.handleMouseout = this.handleMouseout.bind(this);
  }
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
        onClick={this.props.onClick}
        onMouseOver={this.handleMouseover}
        onMouseLeave={this.handleMouseout}
        className={`${classes.marker} ${sizeClass} ${colorClass} ${this.state.activeClass}`}
      >
        {displayedValue.toLocaleString()}
      </div>
    );
  }
}

export default CountryMarker;
