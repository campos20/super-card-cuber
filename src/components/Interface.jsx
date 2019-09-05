import React, { Component } from "react";
import Card from "./Card";
import Input from "./Input";
import "./Interface.css";
import { isValidWcaId } from "../functions/wcaUtils";

class Interface extends Component {
  constructor(props) {
    super(props);

    this.types = ["single", "average"];

    //
    this.specs = [
      { id: "best", name: "best" },
      { id: "country_rank", name: "NR" },
      { id: "continent_rank", name: "CR" },
      { id: "world_rank", name: "WR" }
    ];

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
        x.show = !x.show;
      }
    });
    let state = this.state;
    state.generalItems = generalItems;
    this.setState(state);
  };

  isToShow = (event, type, spec) => {
    let result = false;
    this.state.toShow.forEach(item => {
      if (item.id === event && item.type === type && item.spec === spec) {
        result = true;
      }
    });
    return result;
  };

  toogleToShow = (wcaEvent, type, spec) => {
    let toShow = this.state.toShow;
    let state = this.state;

    // In case the item is set to show, we remove it
    if (this.isToShow(wcaEvent, type, spec)) {
      toShow = toShow.filter(
        x => x.id !== wcaEvent || x.type !== type || x.spec !== spec
      );
    } else {
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

  // Search competitor info in the api
  baseApiUrl = "http://localhost:3000/";
  baseApiUrl = "https://www.worldcubeassociation.org/";
  personsEndpoint = "api/v0/persons/";
  fetchCompetitor = function(wcaId) {
    wcaId = wcaId.toUpperCase();
    let url = this.baseApiUrl + this.personsEndpoint + wcaId;

    //    fetch(url)
    //      .then(res => res.json())
    //      .then(
    //        result => {
    let result = {
      person: {
        wca_id: "2015CAMP17",
        name: "Alexandre Henrique Afonso Campos",
        url: "https://www.worldcubeassociation.org/persons/2015CAMP17",
        gender: "m",
        country_iso2: "BR",
        delegate_status: null,
        teams: [
          {
            friendly_id: "wst",
            leader: false
          }
        ],
        avatar: {
          url:
            "https://www.worldcubeassociation.org/uploads/user/avatar/2015CAMP17/1529076610.jpeg",
          thumb_url:
            "https://www.worldcubeassociation.org/uploads/user/avatar/2015CAMP17/1529076610_thumb.jpeg",
          is_default: false
        }
      },
      competition_count: 28,
      personal_records: {
        "222": {
          single: {
            best: 375,
            world_rank: 16444,
            continent_rank: 1295,
            country_rank: 322
          },
          average: {
            best: 655,
            world_rank: 24442,
            continent_rank: 1831,
            country_rank: 399
          }
        },
        "333": {
          single: {
            best: 1325,
            world_rank: 18992,
            continent_rank: 1517,
            country_rank: 350
          },
          average: {
            best: 1675,
            world_rank: 22093,
            continent_rank: 1774,
            country_rank: 409
          }
        },
        "333bf": {
          single: {
            best: 5006,
            world_rank: 396,
            continent_rank: 21,
            country_rank: 7
          },
          average: {
            best: 6367,
            world_rank: 301,
            continent_rank: 21,
            country_rank: 6
          }
        },
        "333fm": {
          single: {
            best: 22,
            world_rank: 40,
            continent_rank: 1,
            country_rank: 1
          },
          average: {
            best: 2567,
            world_rank: 28,
            continent_rank: 2,
            country_rank: 2
          }
        },
        "333ft": {
          single: {
            best: 24798,
            world_rank: 2578,
            continent_rank: 200,
            country_rank: 95
          }
        },
        "333mbf": {
          single: {
            best: 860352600,
            world_rank: 174,
            continent_rank: 10,
            country_rank: 4
          }
        },
        "333oh": {
          single: {
            best: 3012,
            world_rank: 15912,
            continent_rank: 1311,
            country_rank: 323
          },
          average: {
            best: 3871,
            world_rank: 16858,
            continent_rank: 1393,
            country_rank: 341
          }
        },
        "444": {
          single: {
            best: 8806,
            world_rank: 23293,
            continent_rank: 1984,
            country_rank: 400
          },
          average: {
            best: 9699,
            world_rank: 20253,
            continent_rank: 1760,
            country_rank: 363
          }
        },
        "444bf": {
          single: {
            best: 119600,
            world_rank: 800,
            continent_rank: 33,
            country_rank: 12
          }
        },
        "555": {
          single: {
            best: 17742,
            world_rank: 13963,
            continent_rank: 1085,
            country_rank: 267
          }
        },
        "555bf": {
          single: {
            best: 246000,
            world_rank: 436,
            continent_rank: 15,
            country_rank: 5
          }
        },
        "666": {
          single: {
            best: 46386,
            world_rank: 6863,
            continent_rank: 493,
            country_rank: 130
          }
        },
        "777": {
          single: {
            best: 67200,
            world_rank: 5688,
            continent_rank: 384,
            country_rank: 104
          }
        },
        clock: {
          single: {
            best: 4598,
            world_rank: 6359,
            continent_rank: 387,
            country_rank: 133
          },
          average: {
            best: 6347,
            world_rank: 5064,
            continent_rank: 348,
            country_rank: 123
          }
        },
        minx: {
          single: {
            best: 29321,
            world_rank: 12854,
            continent_rank: 1238,
            country_rank: 402
          }
        },
        pyram: {
          single: {
            best: 1161,
            world_rank: 33425,
            continent_rank: 2375,
            country_rank: 611
          },
          average: {
            best: 1523,
            world_rank: 29829,
            continent_rank: 2104,
            country_rank: 519
          }
        },
        skewb: {
          single: {
            best: 992,
            world_rank: 15513,
            continent_rank: 1002,
            country_rank: 217
          },
          average: {
            best: 2482,
            world_rank: 23732,
            continent_rank: 1392,
            country_rank: 355
          }
        },
        sq1: {
          single: {
            best: 8455,
            world_rank: 9700,
            continent_rank: 733,
            country_rank: 263
          },
          average: {
            best: 12232,
            world_rank: 7715,
            continent_rank: 605,
            country_rank: 238
          }
        }
      },
      medals: {
        gold: 26,
        silver: 9,
        bronze: 8,
        total: 43
      },
      records: {
        national: 0,
        continental: 1,
        world: 0,
        total: 1
      }
    };
    let state = this.state;
    state.competitorInfo = result;
    state.loaded = true;
    this.setState(state);

    //        },
    //        error => {
    //          console.log(error);
    //        }
    //      );
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
        </div>

        <Card
          getCompetitorInfo={this.getCompetitorInfo}
          isLoaded={this.isLoaded}
          competitorInfo={this.state.competitorInfo}
          toShow={this.state.toShow}
          generalItems={this.state.generalItems}
          getSpecName={this.getSpecName}
        />
      </div>
    );
  }
}

export default Interface;
