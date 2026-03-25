export function buildChartOption(data) {
  // Map your sheet columns → chart data
  const division    = data.map(d => d["Division"]);
  const checkedSigs = data.map(d => d["Checked Sigs"]);
  const t1Valid     = data.map(d => d["T1-Validated"]);
  const collectGoal = data.map(d => d["Collection Goal"]);
  const minValid    = data.map(d => d["Min Valid Needed"]);

  const cds         = division.slice(0,8);
  const realCollect = checkedSigs.slice(0,8);
  const realValid   = t1Valid.slice(0,8);
  const goalCollect = collectGoal.slice(0,8);
  const goalValid   = minValid.slice(0,8);

  const diffValid   = subtractVector(goalValid, realValid);
  //const diffCollect = subtractVector(goalCollect, realCollect);


  return {
    tooltip: {
      trigger: 'axis',
    },

    legend: {
      bottom: "0%",
      itemGap: 48,
      padding: [24, 6, 0, 6],
      textStyle: {
        fontSize: 18,
        fontWeight: "bold"
      }
    },

    grid: {
      bottom: 96
    },

    xAxis: {
      axisLabel: {
        fontSize: 18,
        fontWeight: "bold"
      },
      data: cds,
      name: "Congressional District",
      nameLocation: "center",
      nameTextStyle: {
        fontSize: 24,
        fontWeight: "bolder",
        padding: 12
      },
      type: "category"
    },

    yAxis: {
      axisLabel: {
        fontSize: 18,
        fontWeight: "bold"
      },
      name: "Number of Signatures",
      nameLocation: "center",
      nameTextStyle: {
        fontSize: 24,
        fontWeight: "bolder",
        padding: 12
      },
      type: "value"
    },

    series: [
      // Collected Numbers
    //   {
    //     name:  'Collected Sigs',
    //     type:  'bar',
    //     stack: 'collected',
    //     data:  realCollect,
    //     color: "#040449"
    //   },
    //   {
    //     name: 'Sig Collection Goal',
    //     type: 'bar',
    //     stack: 'collected',
    //     data: diffCollect,
    //     color: "#a2bad2"
    //   },

      // Valid Numbers
      {
        name:  'Valid Sigs',
        type:  'bar',
        stack: 'valid',
        data:  realValid,
        color: "#040449"
      },
      {
        name: 'Minimum Valid Sigs Remaining',
        type: 'bar',
        stack: 'valid',
        data: diffValid,
        color: "#a2bad2"
      },
    ]
  };
}

function subtractVector(a,b) {
    return a.map((e,i) => e - b[i]);
}