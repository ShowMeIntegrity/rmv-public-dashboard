import { fetchData } from './fetchData.js';
import { buildChartOption } from './chartConfig.js';

const API_URL = "https://script.google.com/macros/s/AKfycbzyIr-P_cHNEWVtHNdA4W80FeKvGdJt_Yx_bQMUi615nsOZR-sKfvw-qE3Px07Z1Ygn/exec";

const chart = echarts.init(document.getElementById('chart'));

async function render() {
    try {
    const rawData = await fetchData(API_URL);
    const option = buildChartOption(rawData);
    chart.setOption(option);
  } catch (err) {
    console.error("Error loading chart:", err);
  }
}

render();

// Auto-refresh render every 30 seconds
setInterval(render, 30000);