import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from "google-map-react";
import React, { PureComponent } from "react";
import RotatedTitle from "../../../assets/img/rotatedTitle.png";
import countryCoordinates from "../../../data/countries.json";
import CountryMarker from "../countryMarker/countryMarker";
import InfoBox from "../infoBox/infoBox";
import classes from "./worldStatus.module.css";

class Status extends PureComponent {
  retrieveData() {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((blob) => blob.json())
      .then((data) =>
        this.setState({
          mainData: data.map((country) => {
            return {
              ...country,
              casesPerOneMillion: country.casesPerOneMillion ?? 0,
              latitude:
                countryCoordinates.filter(
                  (coord) => coord.name === country.country
                )[0] !== undefined
                  ? countryCoordinates.filter(
                      (coord) => coord.name === country.country
                    )[0].lat
                  : country.countryInfo.lat,
              longitude:
                countryCoordinates.filter(
                  (coord) => coord.name === country.country
                )[0] !== undefined
                  ? countryCoordinates.filter(
                      (coord) => coord.name === country.country
                    )[0].lng
                  : country.countryInfo.long,
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
      top10Cases: {
        cases: sortedCase,
        deaths: sortedDeaths,
        todayCases: sortedTodayCases,
        todayDeaths: sortedTodayDeaths,
        casesPerOneMillion: sortedCasesPerOneMillion,
        deathsPerOneMillion: sortedDeathsPerOneMillion
      },
    });
  }

  handleWindowResize() {
    window.addEventListener("resize", (e) => {
      if (e.srcElement.outerWidth < 900 && e.srcElement.outerWidth >= 600) {
        this.setState({ isSmallScreen: true, mapHeight: 60 });
      } else if (e.srcElement.outerWidth >= 900) {
        this.setState({
          isSmallScreen: false,
          isXSmallScreen: false,
          mapHeight: 60,
        });
      } else if (e.srcElement.outerWidth < 600) {
        this.setState({ isXSmallScreen: true, mapHeight: 100 });
      }
    });
  }

  handleFirstTable() {
    if (window.outerWidth >= 900) {
      this.setState({
        isSmallScreen: false,
        isXSmallScreen: false,
        mapHeight: 60,
      });
    } else if (window.outerWidth >= 600 && window.outerWidth < 900) {
      this.setState({ isSmallScreen: true, mapHeight: 60 });
    } else if (window.outerWidth < 600) {
      this.setState({ isXSmallScreen: true, mapHeight: 100 });
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
        casesPerOneMillion: [],
        deathsPerOneMillion: []
      },
      sortBy: "cases",
      selectedCountry: null,
      isSmallScreen: false,
      isXSmallScreen: false,
      mapHeight: 60,
    };
  }
  componentDidMount() {
    this.retrieveData();
    this.handleFirstTable();
    this.handleWindowResize();
  }

  render() {
    const values = this.state.mainData.map((country) => country[this.state.sortBy]);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    
    return (
      <div>
        <div
          onClick={() => this.setState({ selectedCountry: null })}
          style={{ height: `${this.state.mapHeight}vh`, width: "100%" }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyA3jSaFgByAz1ZNwNWJXj_HmoEMntLPEj8",
              language: "en",
            }}
            defaultCenter={[30, 0]}
            defaultZoom={1}
          >
            {this.state.mainData.map((country) => {
              return (
                <CountryMarker
                  data={country}
                  key={country.country}
                  lat={country.latitude}
                  lng={country.longitude}
                  max={maxValue}
                  min={minValue}
                  onClick={(event) => {
                    this.setState({ selectedCountry: country });
                    event.stopPropagation();
                  }}
                  sortBy={this.state.sortBy}
                />
              );
            })}

            {this.state.selectedCountry ? (
              <InfoBox
                countryData={this.state.selectedCountry}
                lat={this.state.selectedCountry.latitude}
                lng={this.state.selectedCountry.longitude}
              />
            ) : null}
          </GoogleMapReact>
        </div>
        {this.state.isXSmallScreen ? null : (
          <div className={classes.table__container}>
            <p className={classes.table__info}>
              {" "}
              You can click on the headers to see data ordered for each
              parameter.
            </p>
            <div className={classes.table__inner__container}>
              <div className={classes.table__header__container}>
                <img
                  alt="table title"
                  className={classes.table__header}
                  src={RotatedTitle}
                />
              </div>
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th>Country</th>
                    <th
                      className={
                        this.state.sortBy === "cases"
                          ? classes.active_case
                          : null
                      }
                      onClick={() =>
                        this.setState({
                          sortBy: "cases",
                        })
                      }
                    >
                      Cases <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th
                      className={
                        this.state.sortBy === "todayCases"
                          ? classes.active_case
                          : null
                      }
                      onClick={() => this.setState({ sortBy: "todayCases" })}
                    >
                      Today&apos;s Cases <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th
                      className={
                        this.state.sortBy === "deaths"
                          ? classes.active_death
                          : null
                      }
                      onClick={() => this.setState({ sortBy: "deaths" })}
                    >
                      Deaths <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th
                      className={
                        this.state.sortBy === "todayDeaths"
                          ? classes.active_death
                          : null
                      }
                      onClick={() => this.setState({ sortBy: "todayDeaths" })}
                    >
                      Today&apos;s Deaths <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th
                      className={
                        this.state.sortBy === "casesPerOneMillion"
                          ? classes.active_casesPerMillion
                          : null
                      }
                      onClick={() =>
                        this.setState({ sortBy: "casesPerOneMillion" })
                      }
                    >
                      Cases per 1M <FontAwesomeIcon icon={faSort} />
                    </th>
                    <th
                      className={
                        this.state.sortBy === "deathsPerOneMillion"
                          ? classes.active_deathsPerMillion
                          : null
                      }
                      onClick={() =>
                        this.setState({ sortBy: "deathsPerOneMillion" })
                      }
                    >
                      Deaths per 1M <FontAwesomeIcon icon={faSort} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.top10Cases[this.state.sortBy].map((country) => {
                    return (
                      <tr key={country.country}>
                        <td>{country.country}</td>
                        <td>{country.cases.toLocaleString()}</td>
                        <td>{country.todayCases.toLocaleString()}</td>
                        <td>{country.deaths.toLocaleString()}</td>
                        <td>{country.todayDeaths.toLocaleString()}</td>
                        <td>{country.casesPerOneMillion.toLocaleString()}</td>
                        <td>{country.deathsPerOneMillion.toLocaleString()}</td>
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

export default Status;
