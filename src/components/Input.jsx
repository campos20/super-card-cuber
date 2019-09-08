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

    this.getStatus = props.getStatus;
    this.statusEnum = props.statusEnum;
    this.getTotalItemsToShow = props.getTotalItemsToShow;
    this.getMaxItemsToShow = props.getMaxItemsToShow;
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

  handleDownload = () => {
    // This is here just for sanity.
    // Download is handled with a <script> inside index.html
  };

  // The download button is hidden until it's working.
  // For some reason, the avatar is not downloaded and it's not centered.
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
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.handleDownload}
                id="btn-download"
                disabled={this.getStatus() !== this.statusEnum.LOADED}
                title="Download the card after it's rendered."
                style={{ display: "none" }}
              >
                Download
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
                    className="capitalize table-title-type"
                    colSpan={this.specs.length}
                    key={type}
                  >
                    {type}
                  </th>
                ))}
              </tr>
              <tr>
                <th></th>
                {this.types.map(type => (
                  <React.Fragment key={type}>
                    {this.specs.map(spec => (
                      <th key={spec.id} className="capitalize table-title-spec">
                        {spec.name}
                      </th>
                    ))}
                  </React.Fragment>
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
                        <td>
                          <input
                            type="checkbox"
                            id={event.id + "-" + eventSpec + "-" + spec.id}
                            key={event.id + "-" + eventSpec + "-" + spec.id}
                            onClick={this.toogleSelectedEvent}
                            disabled={
                              !this.isToShow(event.id, eventSpec, spec.id) &&
                              this.getTotalItemsToShow() >=
                                this.getMaxItemsToShow()
                            }
                            checked={
                              this.isToShow(event.id, eventSpec, spec.id)
                                ? "true"
                                : ""
                            }
                          ></input>
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
