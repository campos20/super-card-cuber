import React, { Component } from "react";
import "./Card.css";
import { isWcaEvent } from "../functions/wcaUtils";
import timeConverter from "../functions/timeUtils";

class Card extends Component {
  constructor(props) {
    super(props);

    let state = { loaded: false };
    this.state = state;

    this.fetchCompetitor(this.props.competitorId);
  }

  // Search competitor info in the api
  baseApiUrl = "http://localhost:3000/";
  personsEndpoint = "api/v0/persons/";
  fetchCompetitor = function(competitorId) {
    let url = this.baseApiUrl + this.personsEndpoint + competitorId;
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          let state = this.state;
          state.competitor = result;
          state.loaded = true;
          this.setState(state);
        },
        error => {
          console.log(error);
        }
      );
  };

  // Map properties to show in the json in depth
  medals = ["gold", "silver", "bronze"];
  records = ["world", "continental", "national"];
  findResult = (item, type, spec) => {
    let competitor = this.state.competitor;

    if (item === "competitions") return competitor.competition_count;

    if (this.medals.indexOf(item) >= 0) return competitor.medals.item;
    if (item === "totalMedals") return competitor.medals.total;

    if (this.records.indexOf(item) >= 0) return competitor.records.item;
    if (item === "totalRecords") return competitor.records.total;

    if (isWcaEvent(item)) {
      return competitor.personal_records[item][type][spec];
    }

    return "Error.";
  };

  eventsAndSpecs = [
    { id: "333", type: "single", spec: "best" },
    { id: "222", type: "single", spec: "best" },
    { id: "333fm", type: "average", spec: "best" }
  ];

  render() {
    return this.state.loaded ? (
      <div className="cardBase">
        <h1>{this.state.competitor.person.name}</h1>

        <div>
          {/*this.state.competitor.person.avatar.url*/}
          <img
            className="avatar"
            src="https://www.worldcubeassociation.org/uploads/user/avatar/2015CAMP17/1529076610.jpeg"
          ></img>
        </div>

        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>Competitions</td>
              <td>{this.findResult("competitions")}</td>
            </tr>
            <tr>
              <td>Medals</td>
              <td>{this.findResult("totalMedals")}</td>
            </tr>
            <tr>
              <td>Records</td>
              <td>{this.findResult("totalRecords")}</td>
            </tr>

            {this.eventsAndSpecs.map(event => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>
                  {timeConverter(
                    this.findResult(event.id, "single", "best"),
                    event.id
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <span>Loading {this.props.competitorId}...</span>
    );
  }
}

export default Card;
