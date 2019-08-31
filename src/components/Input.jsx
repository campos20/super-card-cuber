import React, { Component } from "react";
import "./Input.css";

class Input extends Component {
  constructor(props) {
    super(props);
    let state = { wcaId: "" };
    this.state = state;

    this.searchCompetitor = props.searchCompetitor;
  }

  handleChange = event => {
    let wcaId = event.target.value.toUpperCase();
    this.setState({ wcaId: wcaId });
    this.searchCompetitor(wcaId);
  };

  render() {
    return (
      <div id="input-base">
        Competitor:
        <br />
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          maxLength="10"
          id="wca-id-input"
        />
        <button>Search competitor</button>
      </div>
    );
  }
}

export default Input;
