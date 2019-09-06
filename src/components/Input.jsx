import React, { Component } from "react";
import "./Input.css";
import { wcaEvents, getName } from "../functions/wcaUtils";

class Input extends Component {
  constructor(props) {
    super(props);

    this.isToShow = props.isToShow;
    this.toogleToShow = props.toogleToShow;

    this.toogleShowGeneralItem = props.toogleShowGeneralItem;

    let state = { wcaId: "" };
    this.state = state;

    this.searchCompetitor = props.searchCompetitor;

    this.types = props.types;
    this.specs = props.specs;
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
    let source = ev.target.getAttribute("id").split("-");
    let wcaEvent = source[0];
    let type = source[1];
    let spec = source[2];

    this.toogleToShow(wcaEvent, type, spec);
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
              <table className="table table-sm table-hover">
                <tbody>
                  {this.props.generalItems.map(event => (
                    <tr key={event.id}>
                      <td
                        onClick={this.toogleGeneralItem}
                        value={event.id}
                        className={
                          event.show ? "table-dark capitalize" : "capitalize"
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
          <table className="table table-sm table-hover">
            <thead>
              <tr>
                <th></th>
                {this.types.map(type => (
                  <th
                    className="capitalize"
                    colSpan={this.specs.length}
                    key={type}
                  >
                    {type}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wcaEvents.map(event => (
                <tr key={event.id}>
                  <th>{getName(event.id)}</th>
                  {event.spec.map(eventSpec => (
                    <React.Fragment key={eventSpec}>
                      {this.specs.map(spec => (
                        <td
                          className={
                            this.isToShow(event.id, eventSpec, spec.id)
                              ? "table-dark capitalize"
                              : "capitalize"
                          }
                          id={event.id + "-" + eventSpec + "-" + spec.id}
                          key={event.id + "-" + eventSpec + "-" + spec.id}
                          onClick={this.toogleSelectedEvent}
                        >
                          {spec.name}
                        </td>
                      ))}
                    </React.Fragment>
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
