import React, { Component } from "react";
import Card from "./Card";
import Input from "./Input";
import "./Interface.css";
import { isValidWcaId } from "../functions/wcaUtils";

class Interface extends Component {
  constructor(props) {
    super(props);

    let generalItems = [
      { id: "competitions", name: "Competitions", show: true },
      { id: "totalMedals", name: "Total Medals", show: true },
      { id: "totalRecords", name: "Total Records", show: true }
    ];

    // Default events to show
    let toShow = [
      { id: "333", type: "single", spec: "best" },
      { id: "333", type: "average", spec: "best" }
    ];

    let state = {
      wcaId: "",
      competitorInfo: {},
      loaded: false,
      generalItems: generalItems,
      toShow: toShow
    };
    this.state = state;
  }

  toogleShowGeneralItem = item => {
    let generalItems = this.state.generalItems;
    generalItems.forEach(x => {
      if (x.id === item) {
        x.show = !x.show;
      }
    });
    let state = this.state;
    state.generalItems = generalItems;
    this.setState(state);
  };

  isToShow = (event, type) => {
    let result = false;
    this.state.toShow.forEach(item => {
      if (item.id === event && item.type === type) {
        result = true;
      }
    });
    return result;
  };

  toogleToShow = (event, type) => {
    let toShow = this.state.toShow;
    let state = this.state;

    if (this.isToShow(event, type)) {
      toShow = toShow.filter(x => x.id !== event || x.type !== type);
    } else {
      toShow.push({ id: event, type: type });
    }

    state.toShow = toShow;
    this.setState(state);
  };

  searchCompetitor = wcaId => {
    if (isValidWcaId(wcaId)) {
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
    wcaId = wcaId.toUpperCase();
    let url = this.baseApiUrl + this.personsEndpoint + wcaId;

    fetch(url)
      .then(res => res.json())
      .then(
        result => {
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
            <div className="col-12">
              <Input
                searchCompetitor={this.searchCompetitor}
                isToShow={this.isToShow}
                toogleToShow={this.toogleToShow}
                generalItems={this.state.generalItems}
                toogleShowGeneralItem={this.toogleShowGeneralItem}
              />
            </div>
          </div>
        </div>

        <Card
          getCompetitorInfo={this.getCompetitorInfo}
          isLoaded={this.isLoaded}
          competitorInfo={this.state.competitorInfo}
          toShow={this.state.toShow}
          generalItems={this.state.generalItems}
        />
      </div>
    );
  }
}

export default Interface;
