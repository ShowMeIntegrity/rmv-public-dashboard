# Dashboard Chart Project

This project renders a dynamic chart using Apache ECharts and data from a Google Sheets JSON API.

## Setup

1. Clone the repo
2. Run a local server
    - Python: `python -m http.server`
    - Node: `npx serve`
3. Open [`http://localhost:8000`](http://localhost:8000)

## Data Source

Data comes from a Google App Script JSON endpoint.

- Modify API URL in: `js/main.js`

## Deployment

Deploy via Github Pages or Vercel, then embed using the platform of your choice.

## Editing the Chart

- Modify chart logic: `js/chartConfig.js`
- Modify data fetching: `js/fetchData.js`