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

    this.getSpecName = props.getSpecName;
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

    // This will render eigher PR single or average
    if ("best" === spec) {
      if (
        !competitor.personal_records[item] ||
        !competitor.personal_records[item][type] ||
        !competitor.personal_records[item][type][spec]
      ) {
        return "-";
      }

      // TODO add type and spec to timeConverter
      return timeConverter(
        competitor.personal_records[item][type][spec],
        type,
        spec
      );
    }

    // NR, CR or WR - rank.
    return competitor.personal_records[item][type][spec];
  };

  render() {
    let competitorInfo = this.props.competitorInfo;
    return this.isLoaded() ? (
      <div id="card-base" className="container">
        <div id="card" className="card">
          <h4>{competitorInfo.person.name}</h4>

          <div>
            {/*this.state.competitor.person.avatar.url*/}
            <img
              className="avatar"
              src={competitorInfo.person.avatar.url}
              alt="Competitor avatar."
            ></img>
          </div>

          <div id="div-table-card">
            <table className="table table-bordered table-striped table-sm">
              <tbody>
                {this.props.generalItems
                  .filter(stat => stat.show)
                  .map(stat => (
                    <tr key={stat.id}>
                      <td>{stat.name}</td>
                      <td>{this.findResult(stat.id)}</td>
                    </tr>
                  ))}

                {this.props.toShow.map(event => (
                  <tr key={event.id + "-" + event.type + "-" + event.spec}>
                    <td className="capitalize">
                      {getName(event.id) +
                        " " +
                        event.type +
                        " " +
                        this.getSpecName(event.spec)}
                    </td>
                    <td>{this.findResult(event.id, event.type, event.spec)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) : (
      <span></span>
    );
  }
}

export default Card;
