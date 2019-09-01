This project allows a user to show cards for a [WCA](https://www.worldcubeassociation.org/) speedcuber.

You can see a live demo [here](https://campos20.github.io/super-card-cuber/).

## Installing the Project

- Clone the project with `git clone https://github.com/campos20/super-card-cuber.git`.
- Enter in the project folder.
- Run `yarn install`.
- Execute with `yarn start`.

Use a browser to navigate to http://localhost:3000 (or another port that appears after `yarn start`).

## Usage

Type a WCA ID in the field "Select a competitor". If the WCA ID is valid, you will see a card with some stats. You can customize the stats by selecting which event to show and general items (competitions, medals, records).

The data is fetched from the WCA website API.

## How It Works

This project was built with React, layout uses Bootstrap, data is fetched from WCA website.
