import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from "google-map-react";
import React, { PureComponent } from "react";
import stateCoordinates from "../../data/states";
import StateInfoBox from "../usStatus/stateInfoBox/stateInfoBox";
import StateMarker from "../usStatus/stateMarker/stateMarker";
import classes from "./usStatus.module.css";

const fields = [
  "cases",
  "todayCases",
  "deaths",
  "todayDeaths",
  "casesPerOneMillion",
  "deathsPerOneMillion",
];

const fieldNames = {
  cases: "Cases",
  todayCases: "Today's Cases",
  deaths: "Deaths",
  todayDeaths: "Today's Deaths",
  casesPerOneMillion: "Cases per 1M",
  deathsPerOneMillion: "Deaths per 1M",
};

const fieldStyles = {
  cases: classes.active_case,
  todayCases: classes.active_case,
  deaths: classes.active_death,
  todayDeaths: classes.active_death,
  casesPerOneMillion: classes.active_casesPerMillion,
  deathsPerOneMillion: classes.active_deathsPerMillion,
};

class usStatus extends PureComponent {
  retrieveData() {
    fetch("https://disease.sh/v3/covid-19/states")
      .then((blob) => blob.json())
      .then((data) =>
        this.setState({
          mainData: data.map((usState) => {
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
    const sortedCasesPerOneMillion = [...this.state.mainData]
      .sort((a, b) => b.casesPerOneMillion - a.casesPerOneMillion)
      .slice(0, 20);
    const sortedDeathsPerOneMillion = [...this.state.mainData]
      .sort((a, b) => b.deathsPerOneMillion - a.deathsPerOneMillion)
      .slice(0, 20);

    this.setState({
      top20Cases: {
        cases: sortedCase,
        deaths: sortedDeaths,
        todayCases: sortedTodayCases,
        todayDeaths: sortedTodayDeaths,
        casesPerOneMillion: sortedCasesPerOneMillion,
        deathsPerOneMillion: sortedDeathsPerOneMillion,
      },
    });
  }

  handleWindowResize() {
    window.addEventListener("resize", (e) => {
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
      top20Cases: {
        cases: [],
        todayCases: [],
        deaths: [],
        todayDeaths: [],
        casesPerOneMillion: [],
        deathsPerOneMillion: [],
      },
      sortBy: "cases",
      selectedState: null,
      isSmallScreen: false,
      mapHeight: 60,
    };
  }

  componentDidMount() {
    this.retrieveData();
    this.handleFirstTable();
    this.handleWindowResize();
  }

  render() {
    const values = this.state.mainData
      .filter((usState) => {
        return stateCoordinates
          .map((state) => state.name)
          .includes(usState.state);
      })
      .map((usState) => usState[this.state.sortBy]);

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    return (
      <div className={classes.mainWrapper}>
        <div
          className={classes.mapContainer}
          onClick={() => this.setState({ selectedState: null })}
          style={{ height: `${this.state.mapHeight}vh`, width: "100%" }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyA3jSaFgByAz1ZNwNWJXj_HmoEMntLPEj8",
              language: "en",
            }}
            defaultCenter={[37.09, -95.71]}
            defaultZoom={4}
          >
            {this.state.mainData
              .filter((usState) => {
                return stateCoordinates
                  .map((state) => state.name)
                  .includes(usState.state);
              })
              .map((usState) => {
                return (
                  <StateMarker
                    data={usState}
                    key={usState.state}
                    lat={usState.latitude}
                    lng={usState.longitude}
                    max={maxValue}
                    min={minValue}
                    onClick={(event) => {
                      this.setState({ selectedState: usState });
                      event.stopPropagation();
                    }}
                    sortBy={this.state.sortBy}
                  />
                );
              })}

            {this.state.selectedState ? (
              <StateInfoBox
                lat={this.state.selectedState.latitude}
                lng={this.state.selectedState.longitude}
                stateData={this.state.selectedState}
              />
            ) : null}
          </GoogleMapReact>
        </div>

        <div className={classes.table__container}>
          <p className={classes.table__info}>
            {" "}
            Top 20 countries for each parameter are displayed on the table.
          </p>
          <select
            className={classes.field__select}
            onChange={(changeEvent) =>
              this.setState({ sortBy: changeEvent.target.value })
            }
            value={this.state.sortBy}
          >
            {fields.map((field) => (
              <option key={field} value={field}>
                {fieldNames[field]}
              </option>
            ))}
          </select>
          <div className={classes.table__inner__container}>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th className={classes.state}>State</th>
                  {fields.map((field, index) => (
                    <th
                      className={
                        this.state.sortBy === field ? fieldStyles[field] : null
                      }
                      key={`${field}-${index}`}
                      onClick={() => this.setState({ sortBy: field })}
                    >
                      {fieldNames[field]} <FontAwesomeIcon icon={faSort} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.top20Cases[this.state.sortBy].map((state) => {
                  return (
                    <tr key={state.state}>
                      <td className={classes.state}>{state.state}</td>
                      {fields.map((field) => (
                        <td
                          className={
                            this.state.sortBy === field
                              ? classes.active_row
                              : null
                          }
                          key={field}
                        >
                          {state[field].toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default usStatus;
