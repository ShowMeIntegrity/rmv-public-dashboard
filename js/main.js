let chart;
isRendering = false;

window.addEventListener('DOMContentLoaded', () => {
  const chartEl    = document.getElementById("chart");
  const skeletonEl = document.getElementById("chart-skeleton");
  const bannerEl   = document.getElementById("banner");
  
  // Check for critical HTML elements
  if (!chartEl || !bannerEl) {
    console.error("Missing required DOM elements");
    return;
  }

  chart = echarts.init(chartEl);
  if (skeletonEl) skeletonEl.style.display = "none";

  // Initial render
  render();

  // Initialize resize handler
  window.addEventListener('resize', () => {
      chart.resize();
    });

    // Set auto-refresh for every 5 minutes
    setInterval(render, 5 * 60 * 1000);
});

async function render() {
  if (isRendering || !chart) return;
  isRendering = true;

  try {
    const sheetData = await fetchData();
    const banner = document.getElementById("banner");

    if (!sheetData) throw new Error("No data returned");

    // Render Banner
    if (banner) {
      banner.innerHTML = buildBanner(sheetData);
    }

    // Render Charts
    const option = buildChartOption(sheetData);
    chart.setOption(option);    

  } catch (err) {
    console.error("Error loading chart:", err);

    const banner = document.getElementById("banner");
    if (bannerEl) {
      banner.innerHTML= "Error loading information";
    }
  } finally {
    isRendering = false;
  }
}