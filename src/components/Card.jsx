import React, { Component } from "react";
import "./Card.css";
import { isWcaEvent, getName } from "../functions/wcaUtils";
import timeConverter from "../functions/timeUtils";

class Card extends Component {
  constructor(props) {
    super(props);

    this.getCompetitorInfo = props.getCompetitorInfo;
    this.isLoaded = props.isLoaded;

    this.toShow = props.toShow;
  }

  // Map properties to show in the json in depth
  // This is a helper function that says: hey, you are looking for totalRecods? I'll show you where it is.
  medals = ["gold", "silver", "bronze"];
  records = ["world", "continental", "national"];
  findResult = (item, type, spec) => {
    let competitor = this.getCompetitorInfo();

    if (item === "competitions") return competitor.competition_count;

    if (this.medals.indexOf(item) >= 0) return competitor.medals.item;
    if (item === "totalMedals") return competitor.medals.total;

    if (this.records.indexOf(item) >= 0) return competitor.records.item;
    if (item === "totalRecords") return competitor.records.total;

    if (isWcaEvent(item)) {
      if (
        !competitor.personal_records[item] ||
        !competitor.personal_records[item][type] ||
        !competitor.personal_records[item][type][spec]
      ) {
        return "-";
      }
      return competitor.personal_records[item][type][spec];
    }

    return "Error.";
  };

  // Some stats
  someStats = [
    { id: "competitions", name: "Competitions" },
    { id: "totalMedals", name: "Total Medals" },
    { id: "totalRecords", name: "Total Records" }
  ];

  render() {
    let competitorInfo = this.props.competitorInfo;
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

              {this.props.toShow.map(event => (
                <tr key={event.id + "-" + event.type}>
                  <td className="capitalize">
                    {getName(event.id) + " " + event.type}
                  </td>
                  <td>
                    {timeConverter(
                      this.findResult(event.id, event.type, "best"),
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
      <span>Select a competitor.</span>
    );
  }
}

export default Card;
