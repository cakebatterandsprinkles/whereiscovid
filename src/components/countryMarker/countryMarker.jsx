import React, { PureComponent } from "react";
import classes from "./countryMarker.module.css";

class CountryMarker extends PureComponent {
    render() {
        if (this.props.data[this.props.sortBy] === 0) {
            return null;
        }
        return (<div className={classes.marker}>{this.props.data[this.props.sortBy].toLocaleString()}</div>);
    }
}

export default CountryMarker;