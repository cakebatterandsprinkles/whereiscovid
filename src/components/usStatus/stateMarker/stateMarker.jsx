import React, { PureComponent } from "react";
import classes from "./stateMarker.module.css";

class StateMarker extends PureComponent {
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
    }
    if (value === "deaths" || value === "todayDeaths") {
      return classes.gray;
    }
    if (value === "casesPerOneMillion") {
      return classes.purple;
    }
    if (value === "deathsPerOneMillion") {
      return classes.orange;
    }
    return classes.red;
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
    const colorClass = this.chooseColor(this.props.sortBy);

    const weight =
      (displayedValue - this.props.min) / (this.props.max - this.props.min);
    return (
      <div
        className={`${classes.marker} ${colorClass} ${this.state.activeClass}`}
        onClick={this.props.onClick}
        onMouseLeave={this.handleMouseout}
        onMouseOver={this.handleMouseover}
        style={{
          opacity: weight * 0.4 + 0.6,
          width: weight * 40 + 40,
          height: weight * 40 + 40,
          fontSize: weight * 8 + 8,
        }}
      >
        {displayedValue.toLocaleString()}
      </div>
    );
  }
}

export default StateMarker;
