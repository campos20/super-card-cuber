import React, { Component } from "react";
import "./Input.css";
import { wcaEvents } from "../functions/wcaUtils";

class Input extends Component {
  constructor(props) {
    super(props);

    this.isToShow = props.isToShow;
    this.toogleToShow = props.toogleToShow;

    this.toogleShowGeneralItem = props.toogleShowGeneralItem;

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

  toogleGeneralItem = ev => {
    let source = ev.target.getAttribute("value");

    this.toogleShowGeneralItem(source);
  };

  render() {
    return (
      <div id="input-base" className="container">
        <div className="row">
          <div className="col-12">
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleCompetitorChange}
              maxLength="10"
              id="wca-id-input"
              placeholder="Select a Competitor"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div>
              <button
                className="btn btn-primary"
                type="button"
                data-toggle="collapse"
                data-target="#collapse-items"
                aria-expanded="false"
                aria-controls="collapse-items"
              >
                General items
              </button>
              <button
                className="btn btn-primary"
                type="button"
                data-toggle="collapse"
                data-target="#collapse-events"
                aria-expanded="false"
                aria-controls="collapse-events"
              >
                Events
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 align-items-center">
            <div className="collapse" id="collapse-items">
              <table className="table table-sm">
                <tbody>
                  {this.props.generalItems.map(event => (
                    <tr key={event.id}>
                      <td
                        onClick={this.toogleGeneralItem}
                        value={event.id}
                        className={
                          event.show ? "table-dark event-spec" : "event-spec"
                        }
                      >
                        {event.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="collapse" id="collapse-events">
          <table className="table table-sm">
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
