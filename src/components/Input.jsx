import React, { Component } from "react";
import "./Input.css";
import { wcaEvents } from "../functions/wcaUtils";

class Input extends Component {
  constructor(props) {
    super(props);

    this.isToShow = props.isToShow;
    this.toogleToShow = props.toogleToShow;

    let state = { wcaId: "" };
    this.state = state;

    this.searchCompetitor = props.searchCompetitor;
  }

  handleCompetitorChange = event => {
    let wcaId = event.target.value.toUpperCase();
    this.setState({ wcaId: wcaId });
    this.searchCompetitor(wcaId);
  };

  // WCA json is fetched with
  // spec
  // best -> PR
  // NR, CR, WR for rankings
  toogleSelectedEvent = ev => {
    // Vanilla javascript to help in getting the value assigned
    // For value, we assign like: 333-single, 333-average...
    let source = ev.target.getAttribute("value").split("-");
    let event = source[0];
    let spec = source[1];

    this.toogleToShow(event, spec);
  };

  render() {
    return (
      <div id="input-base" className="container">
        <div className="row">
          <div className="col-12">Competitor:</div>
        </div>
        <div className="row">
          <div className="col-12">
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleCompetitorChange}
              maxLength="10"
              id="wca-id-input"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 div-btn-control">
            <button
              className="btn btn-primary"
              type="button"
              data-toggle="collapse"
              data-target="#collapseTable"
              aria-expanded="false"
              aria-controls="collapseTable"
            >
              Select events
            </button>
          </div>
        </div>
        <div className="collapse" id="collapseTable">
          <table className="table">
            <tbody>
              {wcaEvents.map(event => (
                <tr key={event.id}>
                  <th>{event.id}</th>
                  {event.spec.map(spec => (
                    <td
                      key={event.id + spec}
                      value={event.id + "-" + spec}
                      onClick={this.toogleSelectedEvent}
                      className={
                        this.isToShow(event.id, spec)
                          ? "table-dark event-spec"
                          : "event-spec"
                      }
                    >
                      {spec}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Input;
