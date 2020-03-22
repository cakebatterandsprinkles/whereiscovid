import React, { PureComponent } from "react";
import classes from "./status.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import countryCoordinates from '../../data/countries'
import GoogleMapReact from 'google-map-react'
import CountryMarker from '../countryMarker/countryMarker'

class Status extends PureComponent {
  retrieveData() {
    fetch("https://corona.lmao.ninja/countries")
      .then(blob => blob.json())
      .then(data => this.setState({
        mainData: data.map(country => {
          return {
            ...country,
            latitude: countryCoordinates.filter(coord => coord.name === country.country)[0].lat,
            longitude: countryCoordinates.filter(coord => coord.name === country.country)[0].lng,
          };
        })
      }))
      .then(() => this.sortData());
  }

  sortData() {
    const sortedCase = [...this.state.mainData]
      .sort((a, b) => b.cases - a.cases)
      .slice(0, 10);
    const sortedDeaths = [...this.state.mainData]
      .sort((a, b) => b.deaths - a.deaths)
      .slice(0, 10);
    const sortedTodayCases = [...this.state.mainData]
      .sort((a, b) => b.todayCases - a.todayCases)
      .slice(0, 10);
    const sortedTodayDeaths = [...this.state.mainData]
      .sort((a, b) => b.todayDeaths - a.todayDeaths)
      .slice(0, 10);
    const sortedRecovered = [...this.state.mainData]
      .sort((a, b) => b.recovered - a.recovered)
      .slice(0, 10);
    const sortedActive = [...this.state.mainData]
      .sort((a, b) => b.active - a.active)
      .slice(0, 10);
    const sortedCritical = [...this.state.mainData]
      .sort((a, b) => b.critical - a.critical)
      .slice(0, 10);
    const sortedCasesPerOneMillion = [...this.state.mainData]
      .sort((a, b) => b.casesPerOneMillion - a.casesPerOneMillion)
      .slice(0, 10);
    this.setState({
      top10Cases: {
        cases: sortedCase,
        deaths: sortedDeaths,
        todayCases: sortedTodayCases,
        todayDeaths: sortedTodayDeaths,
        recovered: sortedRecovered,
        active: sortedActive,
        critical: sortedCritical,
        casesPerOneMillion: sortedCasesPerOneMillion
      }
    });
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
        recovered: [],
        active: [],
        critical: [],
        casesPerOneMillion: []
      },
      sortBy: 'cases'
    };
  }
  componentDidMount() {
    this.retrieveData();
  }

  render() {
    return (
      <div>
        <div style={{ height: '60vh', width: '100%' }}>
          <GoogleMapReact
            defaultCenter={[30, 0]}
            defaultZoom={1}
          >
            {this.state.mainData.map(country => {
              return (
                <CountryMarker key={country.country} lat={country.latitude} lng={country.longitude} data={country} sortBy={this.state.sortBy} />
              );
            })}
          </GoogleMapReact>
        </div>

        <table className={classes.table}>
          <thead>
            <tr>
              <th>Country</th>
              <th onClick={() => this.setState({ sortBy: 'cases' })}>Cases <FontAwesomeIcon icon={faSort} /></th>
              <th onClick={() => this.setState({ sortBy: 'todayCases' })}>Today's Cases <FontAwesomeIcon icon={faSort} /></th>
              <th onClick={() => this.setState({ sortBy: 'deaths' })}>Deaths <FontAwesomeIcon icon={faSort} /></th>
              <th onClick={() => this.setState({ sortBy: 'todayDeaths' })}>Today's Deaths <FontAwesomeIcon icon={faSort} /></th>
              <th onClick={() => this.setState({ sortBy: 'recovered' })}>Recovered <FontAwesomeIcon icon={faSort} /></th>
              <th onClick={() => this.setState({ sortBy: 'active' })}>Active <FontAwesomeIcon icon={faSort} /></th>
              <th onClick={() => this.setState({ sortBy: 'critical' })}>Critical <FontAwesomeIcon icon={faSort} /></th>
              <th onClick={() => this.setState({ sortBy: 'casesPerOneMillion' })}>Cases per 1M <FontAwesomeIcon icon={faSort} /></th>
            </tr>
          </thead>
          <tbody>
            {this.state.top10Cases[this.state.sortBy].map(country => {
              return (
                <tr key={country.country}>
                  <td>{country.country}</td>
                  <td>{country.cases.toLocaleString()}</td>
                  <td>{country.todayCases.toLocaleString()}</td>
                  <td>{country.deaths.toLocaleString()}</td>
                  <td>{country.todayDeaths.toLocaleString()}</td>
                  <td>{country.recovered.toLocaleString()}</td>
                  <td>{country.active.toLocaleString()}</td>
                  <td>{country.critical.toLocaleString()}</td>
                  <td>{country.casesPerOneMillion.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Status;
