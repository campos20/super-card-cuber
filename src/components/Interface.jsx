import React, { Component } from "react";
import Card from "./Card";
import Input from "./Input";
import "./Interface.css";
import { isValidWcaId } from "../functions/wcaUtils";

class Interface extends Component {
  constructor(props) {
    super(props);
    let state = { wcaId: "", competitorInfo: {}, loaded: false };
    this.state = state;
    console.log("props");
    console.log(props);
  }

  searchCompetitor = wcaId => {
    if (isValidWcaId(wcaId)) {
      console.log("searching", wcaId);

      this.fetchCompetitor(wcaId);
    }
  };

  getCompetitorInfo = () => {
    return this.state.competitorInfo;
  };

  isLoaded = () => {
    return this.state.loaded;
  };

  // Search competitor info in the api
  baseApiUrl = "http://localhost:3000/";
  baseApiUrl = "https://www.worldcubeassociation.org/";
  personsEndpoint = "api/v0/persons/";
  fetchCompetitor = function(wcaId) {
    let url = this.baseApiUrl + this.personsEndpoint + wcaId;
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          console.log("Result");
          console.log(result);
          let state = this.state;
          state.competitorInfo = result;
          state.loaded = true;
          this.setState(state);
        },
        error => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <div>
        <div className="jumbotrom">
          <h1 id="main-title">Super Card Cuber</h1>
        </div>
        <br />

        <div className="container">
          <div className="row">
            <div className="col-4">
              <Input searchCompetitor={this.searchCompetitor} />
            </div>
            <div className="col-8">
              <Card
                getCompetitorInfo={this.getCompetitorInfo}
                isLoaded={this.isLoaded}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Interface;
