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
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th onClick={() => this.setState({ sortBy: 'cases' })}>Cases</th>
              <th onClick={() => this.setState({ sortBy: 'todayCases' })}>Today's Cases</th>
              <th onClick={() => this.setState({ sortBy: 'deaths' })}>Deaths</th>
              <th onClick={() => this.setState({ sortBy: 'todayDeaths' })}>Today's Deaths</th>
              <th onClick={() => this.setState({ sortBy: 'recovered' })}>Recovered</th>
              <th onClick={() => this.setState({ sortBy: 'active' })}>Active</th>
              <th onClick={() => this.setState({ sortBy: 'critical' })}>Critical</th>
              <th onClick={() => this.setState({ sortBy: 'casesPerOneMillion' })}>Cases per 1M</th>
            </tr>
          </thead>
          <tbody>
            {this.state.top10Cases[this.state.sortBy].map(country => {
              return (
                <tr>
                  <td>{country.country}</td>
                  <td>{country.cases}</td>
                  <td>{country.todayCases}</td>
                  <td>{country.deaths}</td>
                  <td>{country.todayDeaths}</td>
                  <td>{country.recovered}</td>
                  <td>{country.active}</td>
                  <td>{country.critical}</td>
                  <td>{country.casesPerOneMillion}</td>
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
