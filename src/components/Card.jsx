import React, { Component } from "react";
import "./Card.css";
import { getName } from "../functions/wcaUtils";
import timeConverter from "../functions/timeUtils";
import Flag from "react-country-flag";

class Card extends Component {
  constructor(props) {
    super(props);

    this.getCompetitorInfo = props.getCompetitorInfo;
    this.getStatus = props.getStatus;

    this.toShow = props.toShow;
    this.getGeneralItemsFiltered = props.getGeneralItemsFiltered;
    this.getTotalItemsToShow = props.getTotalItemsToShow;

    this.getSpecName = props.getSpecName;

    this.getStatus = props.getStatus;
    this.statusEnum = props.statusEnum;
  }

  // Map properties to show in the json in depth
  // This is a helper function that says: hey, you are looking for totalRecods? I'll show you where it is.
  medals = ["gold", "silver", "bronze"];
  records = ["world", "continental", "national"];
  findResult = (item, type, spec) => {
    let competitor = this.getCompetitorInfo();

    if (item === "competitions") return competitor.competition_count;

    // Gold, silver or bronze
    if (this.medals.indexOf(item) >= 0) return competitor.medals[item];
    if (item === "totalMedals") return competitor.medals.total;

    if (this.records.indexOf(item) >= 0) return competitor.records.item;
    if (item === "totalRecords") return competitor.records.total;

    // The next two stats depends on this.
    if (
      !competitor.personal_records[item] ||
      !competitor.personal_records[item][type] ||
      !competitor.personal_records[item][type][spec]
    ) {
      return "-";
    }

    // This will render eigher PR single or average
    if ("best" === spec) {
      let wcaEvent = item; // Just for consistency

      return timeConverter(
        competitor.personal_records[wcaEvent][type][spec],
        wcaEvent,
        type
      );
    }

    // NR, CR or WR - rank.
    return competitor.personal_records[item][type][spec];
  };

  render() {
    let status = this.getStatus();

    if (status === this.statusEnum.LOADING) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    if (status === this.statusEnum.ERROR) {
      return <div>Error</div>;
    }

    if (status === this.statusEnum.LOADED) {
      let competitorInfo = this.props.competitorInfo;

      let availableWidth = window.innerWidth;
      let cardWidth = Math.min(400, availableWidth);
      let cardHeight = Math.floor(cardWidth * 1.5);

      let competitorNameHeight = Math.floor(cardHeight / 10);
      let avatarHeight = Math.floor(cardHeight / 3);

      let generalItemToShow = this.getGeneralItemsFiltered();
      let toShow = this.props.toShow;

      let itemRowHeight = Math.floor(
        (cardHeight - competitorNameHeight - avatarHeight) /
          this.getTotalItemsToShow()
      );

      return (
        <div
          id="card-base"
          className="container"
          style={{
            width: cardWidth,
            height: cardHeight,
            paddingLeft: 0,
            paddingRight: 0
          }}
        >
          <div id="card" style={{ height: cardHeight }}>
            <div
              id="competitor-name"
              style={{ height: competitorNameHeight, width: cardWidth }}
            >
              <h4>{competitorInfo.person.name}</h4>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                  <img
                    className="avatar"
                    src={competitorInfo.person.avatar.url}
                    alt="Competitor avatar."
                    style={{ height: avatarHeight }}
                  ></img>
                </div>
                <div className="col-2">
                  <Flag code={competitorInfo.person.country_iso2} />
                </div>
              </div>
            </div>

            <div id="div-table-card">
              <table className="table table-sm">
                <tbody>
                  {generalItemToShow.map(stat => (
                    <tr key={stat.id} style={{ height: itemRowHeight }}>
                      <td className="align-middle">{stat.name}</td>
                      <td className="align-middle">
                        {this.findResult(stat.id)}
                      </td>
                    </tr>
                  ))}

                  {toShow.map(event => (
                    <tr
                      key={event.id + "-" + event.type + "-" + event.spec}
                      style={{ height: itemRowHeight }}
                    >
                      <td className="capitalize align-middle">
                        {getName(event.id) +
                          " " +
                          event.type +
                          " " +
                          this.getSpecName(event.spec)}
                      </td>
                      <td className="align-middle">
                        {this.findResult(event.id, event.type, event.spec)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    // init
    return <span></span>;
  }
}

export default Card;
