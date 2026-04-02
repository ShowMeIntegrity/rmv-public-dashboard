window.buildChartOption = function (data, isMobile) {
  // Set font sizes & text based on platform
  const staticOptions = {
    chartType:           "bar",
    mainTextColor:       "#212126",
    subTextColor:        "#636367",
    xAxisLabel:          "Congressional District",
    stackName:           "valid",
    series1Name:         "Valid Sigs",
    series1BarColorMain: "#040449",
    series1BarColorSub:  "#535f8e",
    series2BarColorMain: "#a2bad2",
    series2BarColorSub:  "#dde5ef",
  }
  const dynamicOptions = isMobile
    ? {
      fontSize:    12,
      title:       "Valid Sigs by CD",
      subtitle:    "We need to qualify in 6 of 8 CDs",
      xAxisRotate: 45,
      yAxisLabel:  "Sig Count",
      series2Name: "Valid Sigs Left",
    }
    : {
      fontSize:    18,
      title:       "Valid Signatures by Congressional District",
      subtitle:    "We need to qualify in 6 out of 8 congressional districts",
      xAxisRotate: 0,
      yAxisLabel:  "Number of Signatures",
      series2Name: "Valid Sigs Remaining"
    };

  const options = { ...staticOptions, ...dynamicOptions };
  

  
  // Map sheet columns to chart data
  const rmv = data.rmv;
  const division    = rmv.map(d => d["Division"]);
  // const checkedSigs = rmv.map(d => d["Checked Sigs"]);
  const t1Valid     = rmv.map(d => d["T1-Validated"]);
  // const collectGoal = rmv.map(d => d["Collection Goal"]);
  const minValid    = rmv.map(d => d["Min Valid Needed"]);

  const cds         = division.slice(0,8);
  // const realCollect = checkedSigs.slice(0,8);
  const realValid   = t1Valid.slice(0,8);
  // const goalCollect = collectGoal.slice(0,8);
  const goalValid   = minValid.slice(0,8);

  const diffValid   = subtractVector(goalValid, realValid);
  // const diffCollect = subtractVector(goalCollect, realCollect);


  return {
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        let total = 0;

        params.forEach(p => {
          total += p.value;
        });

        const pct = total ? ((params[0].value / total) * 100).toFixed(1) : 0;

        let html = `<strong>${params[0].axisValue} (${pct}%)</strong><br/>`;
        
        params.forEach(p => {
          
          html += `
            ${p.marker} ${p.seriesName}
            <span style="float:right; padding-left:24px"><strong>${p.value.toLocaleString()}</strong></span><br/>
          `;
        });

        return html;
      }
    },

    title: {
      subtext: options.subtitle,
      subtextStyle: {
        color: options.subTextColor,
        fontSize: options.fontSize * 4 / 3
      },
      text: options.title,
      textStyle: {
        color: options.mainTextColor,
        fontSize: options.fontSize * 2
      }
    },

    legend: {
      bottom: "2%",
      itemGap: options.fontSize * 8 / 3,
      padding: [24, 6, 0, 6],
      textStyle: {
        fontSize: options.fontSize,
        fontWeight: "bold"
      }
    },

    grid: {
      top: "20%",
      bottom: "15%",
      left: "5%",
      right: "5%",
      containLabel: true
    },

    xAxis: {
      axisLabel: {
        fontSize: options.fontSize,
        fontWeight: "bold",
        rotate: options.xAxisRotate
      },
      data: cds,
      name: options.xAxisLabel,
      nameLocation: "center",
      nameTextStyle: {
        fontSize: options.fontSize * 4 / 3,
        fontWeight: "bolder",
        padding: 12
      },
      type: "category"
    },

    yAxis: {
      axisLabel: {
        fontSize: options.fontSize,
        fontWeight: "bold"
      },
      name: options.yAxisLabel,
      nameGap: 48,
      nameLocation: "center",
      nameTextStyle: {
        fontSize: options.fontSize * 4 / 3,
        fontWeight: "bolder",
        padding: 12
      },
      type: "value"
    },

    series: [{
      // Valid Numbers
      name:  options.series1Name,
      type:  options.chartType,
      stack: options.stackName,
      data:  realValid,
      color: options.series1BarColorMain,
      itemStyle: {
        color: function (params) {
          if (params.dataIndex === 5 | params.dataIndex === 7) {
            return options.series1BarColorSub;
          }
          return options.series1BarColorMain;
        }
      }
    },
    {
      // Remaining Numbers
      name: options.series2Name,
      type: options.chartType,
      stack: options.stackName,
      data: diffValid,
      color: options.series2BarColorMain,
      itemStyle: {
        color: function (params) {
          if (params.dataIndex === 5 | params.dataIndex === 7) {
            return options.series2BarColorSub;
          }
          return options.series2BarColorMain;
        }
      }
    }]
  };
}

function subtractVector(a,b) {
    return a.map((e,i) => e - b[i]);
}