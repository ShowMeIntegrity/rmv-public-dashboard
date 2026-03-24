import {fetchData} from './fetchData.js'

const API_URL = "https://script.google.com/macros/s/AKfycbzyIr-P_cHNEWVtHNdA4W80FeKvGdJt_Yx_bQMUi615nsOZR-sKfvw-qE3Px07Z1Ygn/exec";

async function render() {
    const rawData = await fetchData(API_URL);
}

render();

// Auto-refresh render every 30 seconds
setInterval(render, 30000);