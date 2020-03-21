import React, { PureComponent } from "react";
import classes from "./status.module.css";

class Status extends PureComponent {
  retrieveData() {
    fetch("https://corona.lmao.ninja/countries")
      .then(blob => blob.json())
      .then(data => this.setState({ mainData: data }))
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
    const sortedCasesPerOneMillon = [...this.state.mainData]
      .sort((a, b) => b.casesPerOneMillon - a.casesPerOneMillon)
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
        casesPerOneMillon: sortedCasesPerOneMillon
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
        casesPerOneMillon: []
      }
    };
  }
  componentDidMount() {
    this.retrieveData();
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Cases</th>
              <th>Deaths</th>
              <th>Recovered</th>
              <th>Active</th>
              <th>Critical</th>
            </tr>
          </thead>
          <tbody>
            {this.state.top10Cases.casesPerOneMillon.map(country => {
              return (
                <tr>
                  <td>{country.country}</td>
                  <td>{country.cases}</td>
                  <td>
                    {country.deaths} <small>/ {country.todayDeaths}</small>
                  </td>
                  <td>{country.recovered}</td>
                  <td>{country.active}</td>
                  <td>{country.critical}</td>
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
