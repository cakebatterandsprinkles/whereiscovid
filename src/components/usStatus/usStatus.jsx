import React, { PureComponent, Fragment } from "react";
import classes from "./usStatus.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import stateCoordinates from "../../data/states";
import GoogleMapReact from "google-map-react";
import StateMarker from "../usStatus/stateMarker/stateMarker";
import RotatedTitle from "../../assets/img/rotatedTitle.png";
import StateInfoBox from "../usStatus/stateInfoBox/stateInfoBox";

class usStatus extends PureComponent {
  retrieveData() {
    fetch("https://corona.lmao.ninja/states")
      .then(blob => blob.json())
      .then(data =>
        this.setState({
          mainData: data.map(usState => {
            return {
              ...usState,
              latitude:
                stateCoordinates.filter(
                  coord => coord.name === usState.state
                )[0] !== undefined
                  ? stateCoordinates.filter(
                      coord => coord.name === usState.state
                    )[0].lat
                  : 37.0902,
              longitude:
                stateCoordinates.filter(
                  coord => coord.name === usState.state
                )[0] !== undefined
                  ? stateCoordinates.filter(
                      coord => coord.name === usState.state
                    )[0].lng
                  : -95.7129
            };
          })
        })
      )
      .then(() => this.sortData());
  }

  sortData() {
    const sortedCase = [...this.state.mainData]
      .sort((a, b) => b.cases - a.cases)
      .slice(0, 20);
    const sortedDeaths = [...this.state.mainData]
      .sort((a, b) => b.deaths - a.deaths)
      .slice(0, 20);
    const sortedTodayCases = [...this.state.mainData]
      .sort((a, b) => b.todayCases - a.todayCases)
      .slice(0, 20);
    const sortedTodayDeaths = [...this.state.mainData]
      .sort((a, b) => b.todayDeaths - a.todayDeaths)
      .slice(0, 20);
    const sortedActive = [...this.state.mainData]
      .sort((a, b) => b.active - a.active)
      .slice(0, 20);
    this.setState({
      top10Cases: {
        cases: sortedCase,
        deaths: sortedDeaths,
        todayCases: sortedTodayCases,
        todayDeaths: sortedTodayDeaths,
        active: sortedActive
      }
    });
  }

  handleWindowResize() {
    window.addEventListener("resize", e => {
      if (e.srcElement.outerWidth >= 750) {
        this.setState({ isSmallScreen: false, mapHeight: 60 });
      } else if (e.srcElement.outerWidth < 750) {
        this.setState({ isSmallScreen: true, mapHeight: 100 });
      }
    });
  }

  handleFirstTable() {
    if (window.outerWidth >= 750) {
      this.setState({ isSmallScreen: false, mapHeight: 60 });
    } else if (window.outerWidth < 750) {
      this.setState({ isSmallScreen: true, mapHeight: 100 });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      mainData: [],
      top10Cases: {
        cases: [],
        todayCases: [],
        deaths: [],
        todayDeaths: [],
        active: []
      },
      sortBy: "cases",
      selectedState: null,
      isSmallScreen: false,
      mapHeight: 60
    };
  }

  componentDidMount() {
    this.retrieveData();
    this.handleFirstTable();
    this.handleWindowResize();
  }

  render() {
    return (
      <div>
        <div
          style={{ height: `${this.state.mapHeight}vh`, width: "100%" }}
          onClick={() => this.setState({ selectedState: null })}
        >
          <GoogleMapReact
            defaultCenter={[37.09, -95.71]}
            defaultZoom={4}
            bootstrapURLKeys={{
              key: "AIzaSyA3jSaFgByAz1ZNwNWJXj_HmoEMntLPEj8",
              language: "en"
            }}
          >
            {this.state.mainData.map(usState => {
              return (
                <StateMarker
                  key={usState.state}
                  lat={usState.latitude}
                  lng={usState.longitude}
                  data={usState}
                  sortBy={this.state.sortBy}
                  onClick={event => {
                    this.setState({ selectedState: usState });
                    event.stopPropagation();
                  }}
                />
              );
            })}

            {this.state.selectedState ? (
              <StateInfoBox
                stateData={this.state.selectedState}
                lat={this.state.selectedState.latitude}
                lng={this.state.selectedState.longitude}
              />
            ) : null}
          </GoogleMapReact>
        </div>
        {this.state.isSmallScreen ? null : (
          <div className={classes.table__container}>
            <p className={classes.table__info}>
              {" "}
              You can click on the headers to see data ordered for each
              parameter.
            </p>
            <div className={classes.table__inner__container}>
              <div className={classes.table__header__container}>
                <img
                  className={classes.table__header}
                  src={RotatedTitle}
                  alt="table title"
                />
              </div>
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th>State</th>
                    <th
                      onClick={() =>
                        this.setState({
                          sortBy: "cases"
                        })
                      }
                      className={
                        this.state.sortBy === "cases"
                          ? classes.active_case
                          : null
                      }
                    >
                      Cases <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th
                      onClick={() => this.setState({ sortBy: "todayCases" })}
                      className={
                        this.state.sortBy === "todayCases"
                          ? classes.active_case
                          : null
                      }
                    >
                      Today's Cases <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th
                      onClick={() => this.setState({ sortBy: "deaths" })}
                      className={
                        this.state.sortBy === "deaths"
                          ? classes.active_death
                          : null
                      }
                    >
                      Deaths <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th
                      onClick={() => this.setState({ sortBy: "todayDeaths" })}
                      className={
                        this.state.sortBy === "todayDeaths"
                          ? classes.active_death
                          : null
                      }
                    >
                      Today's Deaths <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th
                      onClick={() => this.setState({ sortBy: "active" })}
                      className={
                        this.state.sortBy === "active"
                          ? classes.active_active
                          : null
                      }
                    >
                      Active <FontAwesomeIcon icon={faSort} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.top10Cases[this.state.sortBy].map(usState => {
                    return (
                      <tr key={usState.state}>
                        <td>{usState.state}</td>
                        <td>{usState.cases.toLocaleString()}</td>
                        <td>{usState.todayCases.toLocaleString()}</td>
                        <td>{usState.deaths.toLocaleString()}</td>
                        <td>{usState.todayDeaths.toLocaleString()}</td>
                        <td>{usState.active.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default usStatus;
