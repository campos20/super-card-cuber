import React, { Component } from "react";
import Card from "./Card";
import Input from "./Input";
import "./Interface.css";
import { isValidWcaId } from "../functions/wcaUtils";

class Interface extends Component {
  constructor(props) {
    super(props);

    this.types = ["single", "average"];

    this.specs = [
      { id: "best", name: "best" },
      { id: "country_rank", name: "Natioanl Rank" },
      { id: "continent_rank", name: "Continental Rank" },
      { id: "world_rank", name: "World Rank" }
    ];

    let generalItems = [
      { id: "competitions", name: "Competitions", show: true },
      { id: "gold", name: "Gold", show: true },
      { id: "silver", name: "Silver", show: true },
      { id: "bronze", name: "Bronze", show: true },
      { id: "totalMedals", name: "Total Medals", show: false },
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

    // Hopefully, the view won't get messy if we use this.
    this.CARD_LIMIT_LINE_NUMBER = 10;
  }

  /**
   * Given the id spec, returns its name.
   * Example: national_rank => NR
   */
  getSpecName = specId => {
    return this.specs.filter(x => x.id === specId)[0].name;
  };

  toogleShowGeneralItem = item => {
    let generalItems = this.state.generalItems;
    generalItems.forEach(x => {
      if (x.id === item) {
        let oldFlag = x.show;

        // This will limit the number of lines. It's ok to remove.
        if (
          oldFlag ||
          this.getTotalItemsToShow() < this.CARD_LIMIT_LINE_NUMBER
        ) {
          x.show = !x.show;
        }
      }
    });
    let state = this.state;
    state.generalItems = generalItems;
    this.setState(state);
  };

  // This is for specific events
  // Eg 333, single, best or 333, single, NR (rank)
  isToShow = (event, type, spec) => {
    let result = false;
    this.state.toShow.forEach(item => {
      if (item.id === event && item.type === type && item.spec === spec) {
        result = true;
      }
    });
    return result;
  };

  // Actually, this adds or remove events.
  toogleToShow = (wcaEvent, type, spec) => {
    let toShow = this.state.toShow;
    let state = this.state;

    // In case the item is set to show, we remove it
    if (this.isToShow(wcaEvent, type, spec)) {
      toShow = toShow.filter(
        x => x.id !== wcaEvent || x.type !== type || x.spec !== spec
      );
    } else {
      // We do not allow adding events beyong the limit
      if (this.getTotalItemsToShow() >= this.CARD_LIMIT_LINE_NUMBER) {
        return;
      }
      toShow.push({ id: wcaEvent, type: type, spec: spec });
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

  // Return the general item that will be rendered.
  // Competitions, medals, specific medals or records.
  getGeneralItemsFiltered = () => {
    return this.state.generalItems.filter(x => x.show);
  };

  // This is the number of lines the card will have.
  getTotalItemsToShow = () => {
    return this.state.toShow.length + this.getGeneralItemsFiltered().length;
  };

  // Search competitor info in the api
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
                types={this.types}
                specs={this.specs}
              />
            </div>
          </div>
          <div className="row">
            <Card
              getCompetitorInfo={this.getCompetitorInfo}
              isLoaded={this.isLoaded}
              competitorInfo={this.state.competitorInfo}
              toShow={this.state.toShow}
              getGeneralItemsFiltered={this.getGeneralItemsFiltered}
              getSpecName={this.getSpecName}
              getTotalItemsToShow={this.getTotalItemsToShow}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Interface;
