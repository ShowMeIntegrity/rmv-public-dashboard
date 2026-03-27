import { fetchData } from './fetchData.js';
import { buildChartOption } from './chartConfig.js';
import { buildBanner } from './bannerConfig.js';

const RMV_API_URL = "https://script.google.com/macros/s/AKfycbzyIr-P_cHNEWVtHNdA4W80FeKvGdJt_Yx_bQMUi615nsOZR-sKfvw-qE3Px07Z1Ygn/exec";

const chart = echarts.init(document.getElementById("chart"));
const banner = document.getElementById("banner");

async function render() {
    try {
    const sheetData = await fetchData(RMV_API_URL);

    // Render Banner
    banner.innerHTML = buildBanner(sheetData);

    // Render Charts
    const option = buildChartOption(sheetData);
    chart.setOption(option);

    window.addEventListener('resize', () => {
      chart.resize();
    });

  } catch (err) {
    console.error("Error loading chart:", err);
    banner.innerHTML= "Error loading information";
  }
}

render();

// Auto-refresh render every 30 seconds
setInterval(render, 300000);