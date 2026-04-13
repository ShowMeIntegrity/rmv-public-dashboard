window.buildChartOption = function (data, isMobile) {  
  // Map sheet columns to chart data
  const rmv = data.rmv;
  const fw  = data.fw.data;

  const division    = rmv.map(d => d["Division"]);
  const t1Valid     = rmv.map(d => d["T1-Validated"]);
  const minValid    = rmv.map(d => d["Min Valid Needed"]);

  const cds         = division.slice(0,8);
  let   realValid   = t1Valid.slice(0,8);
  const goalValid   = minValid.slice(0,8);

  let   diffValid   = subtractVector(goalValid, realValid);

  // Check if confirmed valid sigs exceedes goal for each CD
  diffValid.forEach ( (sigsLeft, idx) => {
    if (sigsLeft <= 0) {
      // Set number of valid sigs to goal and set difference to 0
      realValid[idx] = goalValid[idx];
      diffValid[idx] = 0;
    }
  });

  // Get number of signatures reviewed
  const raw  = rmv.map(d => d["Raw Sigs"]);
  const paid = fw.map(d => d.signature_count);

  const volNum     = raw.at(-2);
  const paidNum    = paid.reduce((sum, val) => sum + val, 0);
  const totalNum   = volNum + paidNum;

  const reviewed      = rmv.map(d => d["Reviewed by eQual"]);
  const reviewNum     = reviewed.at(-3);
  const reviewPercent = reviewNum/totalNum * 100;


  // Set font sizes & text based on platform
  const defaultFontSize = isMobile ? 12 : 18;

  const staticOptions = {
    chartType:           "bar",
    fontSize:            defaultFontSize,
    mainTextColor:       "#212126",
    series1Name:         "Valid Sigs",
    series1BarColorMain: "#040449",
    series1BarColorSub:  "#535f8e",
    series1BarColorDone: "#ffce0c",
    series2BarColorMain: "#a2bad2",
    series2BarColorSub:  "#dde5ef",
    stackName:           "valid",
    subTextColor:        "#636367",
    subtitle1Top:        defaultFontSize * 2.25,
    xAxisLabel:          "Congressional District",
    xAxisNameGap:        24
  }

  const dynamicOptions = isMobile
    ? {
      title:        "Valid Sigs by CD",
      subtitle1:    "We need to qualify in 6 of 8 CDs",
      subtitle2:    `${reviewNum.toLocaleString()} sigs checked for validity`,
      subtitle3:    `(${reviewPercent.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}% of collected sigs)`,
      series2Name:  "Valid Sigs Left",
      yAxisLabel:   "Sig Count",
      xAxisRotate:  45,
      yAxisNameGap: 42,
      subtitle2Top: defaultFontSize * 4,
      subtitle3Top: defaultFontSize * 6,
      gridTop:      defaultFontSize * 8.25,
      gridLeft:     "10%"
    }
    : {
      title:        "Valid Signatures by Congressional District",
      subtitle1:    "We need to qualify in 6 out of 8 congressional districts",
      subtitle2:    `${reviewNum.toLocaleString()} signatures checked for validity`,
      subtitle3:    `(${reviewPercent.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}% of collected signatures)`,
      series2Name:  "Valid Sigs Remaining",
      yAxisLabel:   "Number of Signatures",
      xAxisRotate:  0,
      yAxisNameGap: 72,
      subtitle2Top: defaultFontSize * 4.25,
      subtitle3Top: defaultFontSize * 6.25,
      gridTop:      defaultFontSize * 8,
      gridLeft:     "7%"
    };

  const options = { ...staticOptions, ...dynamicOptions };


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

    title: [
      {
        text: options.title,
        textStyle: {
          color: options.mainTextColor,
          fontSize: options.fontSize * 2
        },
        top: 0
      },
      {
        text: options.subtitle1,
        textStyle: {
          color: options.subTextColor,
          fontSize: options.fontSize * 4 / 3,
          fontWeight: "normal"
        },
        top: options.subtitle1Top
      },
      {
        text: options.subtitle2,
        textStyle: {
          color: options.series1BarColorMain,
          fontSize: options.fontSize * 5 / 3,
          fontWeight: 600
        },
        top: options.subtitle2Top
      },
      {
        text: options.subtitle3,
        textStyle: {
          color: options.subTextColor,
          fontSize: options.fontSize * 4 / 3,
          fontWeight: "normal"
        },
        top: options.subtitle3Top
      }
    ],

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
      top: options.gridTop,
      bottom: "15%",
      left: options.gridLeft,
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
      nameGap: options.xAxisNameGap,
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
      nameGap: options.yAxisNameGap,
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
          if (diffValid[params.dataIndex] <= 0) {
            return options.series1BarColorDone;
          }
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