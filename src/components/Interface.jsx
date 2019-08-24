import React, { Component } from "react";
import Card from "./Card";

class Interface extends Component {
  render() {
    let competitorId = "2015CAMP17";

    let toShow = {
      gold: false,
      silver: false,
      bronze: false,
      totalMedals: true,

      competitionCount: true
    };

    return (
      <div>
        <Card competitorId={competitorId} toShow={toShow}></Card>
      </div>
    );
  }
}

export default Interface;
