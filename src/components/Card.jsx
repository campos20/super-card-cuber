import React, { Component } from "react";
import "./Card.css";
import { isWcaEvent, getName } from "../functions/wcaUtils";
import timeConverter from "../functions/timeUtils";

class Card extends Component {
  constructor(props) {
    super(props);

    this.getCompetitorInfo = props.getCompetitorInfo;
    this.isLoaded = props.isLoaded;
  }
  // Map properties to show in the json in depth
  medals = ["gold", "silver", "bronze"];
  records = ["world", "continental", "national"];
  findResult = (item, type, spec) => {
    let competitor = this.getCompetitorInfo();
    console.log("competitor");
    console.log(competitor);

    if (item === "competitions") return competitor.competition_count;

    if (this.medals.indexOf(item) >= 0) return competitor.medals.item;
    if (item === "totalMedals") return competitor.medals.total;

    if (this.records.indexOf(item) >= 0) return competitor.records.item;
    if (item === "totalRecords") return competitor.records.total;

    if (isWcaEvent(item)) {
      return competitor.personal_records[item][type][spec] || "-";
    }

    return "Error.";
  };

  // WCA json is fetched with
  // spec
  // best -> PR
  // NR, CR, WR for rankings
  eventsAndSpecs = [
    { id: "333", type: "single", spec: "best" },
    { id: "222", type: "single", spec: "best" },
    { id: "333fm", type: "average", spec: "best" }
  ];

  // Some stats
  someStats = [
    { id: "competitions", name: "Competitions" },
    { id: "totalMedals", name: "Total Medals" },
    { id: "totalRecords", name: "Total Records" }
  ];

  render() {
    let competitorInfo = this.getCompetitorInfo();
    console.log("Comp info");
    console.log(competitorInfo);
    return this.isLoaded() ? (
      <div className="cardBase">
        <h4>{competitorInfo.person.name}</h4>

        <div>
          {/*this.state.competitor.person.avatar.url*/}
          <img className="avatar" src={competitorInfo.person.avatar.url}></img>
        </div>

        <div>
          <table className="table table-bordered table-striped table-sm">
            <tbody>
              {this.someStats.map(stat => (
                <tr key={stat.id}>
                  <td>{stat.name}</td>
                  <td>{this.findResult(stat.id)}</td>
                </tr>
              ))}

              {this.eventsAndSpecs.map(event => (
                <tr key={event.id}>
                  <td className="capitalize">
                    {getName(event.id) + " " + event.type}
                  </td>
                  <td>
                    {timeConverter(
                      this.findResult(event.id, event.type, event.spec),
                      event.id
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <span>Loading {this.props.wcaId}...</span>
    );
  }
}

export default Card;
